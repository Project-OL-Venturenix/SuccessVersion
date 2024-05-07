const fs = require('fs');
const path = require('path');
const FileApi = require('../api/FileApi');
const CRunner = require('./CRunner');
const CppRunner = require('./CppRunner');
const JavaRunner = require('./JavaRunner');
const JavaScriptRunner = require('./JavaScriptRunner');
const PythonRunner = require('./PythonRunner');

function Factory() {
  this.createRunner = function createRunner(lang, questionId) {
    let runner;

    if (lang === 'c') {
      runner = new CRunner();
    } else if (lang === 'c++') {
      runner = new CppRunner();
    } else if (lang === 'java') {
      runner = new JavaRunner(questionId);
    } else if (lang === 'javascript') {
      runner = new JavaScriptRunner();
    } else if (lang === 'python') {
      runner = new PythonRunner();
    }

    return runner;
  };
}

module.exports = {
  run(lang, code, res, questionId,userId,userName) {
    const factory = new Factory(questionId);
    const runner = factory.createRunner(lang.toLowerCase(),questionId);

    const directory = path.join(__dirname, 'temp');

    let formattedUserId = userId.toString();
    if (userId < 10) {
      formattedUserId = '00' + formattedUserId;
    } else if (userId < 100) {
      formattedUserId = '0' + formattedUserId;
    }

    const userDirectory = path.join(directory, `${formattedUserId}_${userName}`);
    if (!fs.existsSync(userDirectory)) {
      fs.mkdirSync(userDirectory);
    }

    const file = path.join(userDirectory, runner.defaultFile(questionId));//question file

    const filename = path.parse(file).name; // main
    const extension = path.parse(file).ext; // .java
    console.log(`RunnerManager_filename : ${filename}`);
    console.log(`RunnerManager_extension : ${extension}`);

    FileApi.saveFile(file, code, questionId,() => {
      runner.run(file, directory, filename, extension, (status, message) => {
        const result = {
          status,
          message,
        };
        res.end(JSON.stringify(result));
      });
    });
    console.log('Success saveFile');

  },
};
