const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const axios = require('axios');
const baseUrl = 'http://ec2-13-212-138-4.ap-southeast-1.compute.amazonaws.com:8082';

module.exports = {
  saveFile(file, data, questionId, callback) {
    mkdirp(path.dirname(file), (err) => {
      if (err) return callback(err);

      const jsonData = data;
      const jsonDataWithoutClosingBrace = jsonData.replace(/\}\s*$/, '');
      //add mainMethod
      const jsonFile = path.join(__dirname, '../templates', `Question${questionId}.json`);
      fs.readFile(jsonFile, 'utf8', (err, data) => {
        if (err) return callback(err); // Pass the error to the callback

        let mainMethodData;
        try {
          mainMethodData = JSON.parse(data);
        } catch (parseError) {
          console.error('Error parsing JSON data:', parseError);
          // Log the error and continue with the next request
          return callback(); // Assuming you still want to proceed with the next request
        }
        if (!mainMethodData || typeof mainMethodData !== 'object') {
          console.error('Invalid JSON data format: Not an object');
          // Log the error and continue with the next request
          return callback(); // Assuming you still want to proceed with the next request
        }
        const { mainMethod } = mainMethodData;

        const javaClass = `${jsonDataWithoutClosingBrace}\n\n${mainMethod}\n\n`;

        fs.writeFile(file, javaClass, 'utf8', (err2) => {
          if (err2) return callback(err2);
          callback(); // Call the callback to indicate completion
        });
      });
    });
  },
  //question part
  startConvertJsonToJava(questionId, callback) {
    const jsonFile = path.join(__dirname, '../templates', `Question${questionId}.json`);
    fs.readFile(jsonFile, 'utf8', (err, data) => {
      if (err) throw err;
      let jsonData;
      try {
        // Ensure directory exists
        const dirPath = path.dirname(jsonFile);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }
        jsonData = JSON.parse(data);
      } catch (parseError) {
        callback(parseError);
        // throw new Error('Error parsing JSON data');
      }
      if (!jsonData || typeof jsonData !== 'object') {
        callback();
        // throw new Error('Invalid JSON data format: Not an object');
      }
      const { classDeclaration, code } = jsonData;
      if (typeof classDeclaration !== 'string' || typeof code !== 'string') {
        callback();
        // throw new Error('Invalid JSON data format: Missing or invalid string properties');
      }
      const javaCode = `${classDeclaration}\n${code}\n`;
      callback(javaCode);
    });
  },

  //create a function that by calling http://localhost:8082/api/questions ,the response of this api is a List , it will generate json file
  saveJsonFile(questionId, callback) {
    console.log('start convert json file, questionId: ' + questionId);
    console.log('baseUrl : ' + baseUrl + '/api/questions/' + questionId);
    try {
      axios.get(`${baseUrl}/api/questions/${questionId}`)
        .then((response) => {
          const jsonData = response.data;
          console.log('Received data from API:', jsonData);

          if (!jsonData || typeof jsonData !== 'object') {
            callback();

            // throw new Error('Invalid data received from API');
          }

          const jsonString = JSON.stringify(jsonData);
          console.log('Converted JSON string:', jsonString);

          const jsonFilePath = path.join(__dirname, '../templates', `Question${questionId}.json`);
          console.log('File path:', jsonFilePath);

          // Ensure directory exists
          const dirPath = path.dirname(jsonFilePath);
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
          }

          fs.writeFile(jsonFilePath, jsonString, (err) => {
            if (err) throw err;
            console.log('JSON file created successfully.');
            callback(jsonData); // Pass jsonData to callback
          });
        })
        .catch((error) => {
          console.error('Error fetching data from API:', error);
          callback(error);

          // throw error;
        });
    } catch (error) {
      console.error('Error occurred while converting JSON:', error);
      callback(error);
      // throw error;
    }
  },
  getFile(lang, questionId, callback) {
    let file = '';
    const language = lang.toLowerCase();
    if (language === 'java') {
      this.saveJsonFile(questionId, () => {
        this.startConvertJsonToJava(questionId, (javaCode) => {
          file = path.join(__dirname, '../templates', `Question${questionId}.java`);
          if (!fs.existsSync(file)) {
            fs.writeFileSync(file, '');
          }
          try {
            fs.writeFile(file, javaCode, (err) => {
              if (err) throw err;
              console.log(`Question${questionId}.java file created with Java code.`);
              fs.readFile(file, (err, data) => {
                if (err) throw err;
                console.log('data.toString() : ' + data.toString());
                callback(data.toString());
              });
            });
          } catch (err) {
            console.error('Error occurred while writing Java file:', err);
            callback(err);
          }
        });
      });
    } else if (language === 'c') {
      file = path.join(__dirname, '../templates', 'Hello.c');
    } else if (language === 'c++') {
      file = path.join(__dirname, '../templates', 'Hello.cpp');
    } else if (language === 'javascript') {
      file = path.join(__dirname, '../templates', 'Hello.js');
    } else if (language === 'python') {
      file = path.join(__dirname, '../templates', 'Hello.py');
    } else {
      callback('');
      return;
    }
  },
};