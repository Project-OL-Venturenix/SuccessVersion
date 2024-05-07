const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const { Semaphore } = require('await-semaphore');
const FileApi = require('./api/FileApi');
const RunnerManager = require('./compiler/RunnerManager');

const PORT = process.env.PORT || 8083;

const app = express();
const limiter = rateLimit({
  windowMs: 60, // 1 minutes
  max: 10, // limit each IP to 10 requests per windowMs
});

const semaphore = new Semaphore(10); // 10 concurrent requests

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files
app.use(express.static('dist'));

const cors = require('cors');
app.use(cors({ origin: '*' }));

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://ec2-13-212-138-4.ap-southeast-1.compute.amazonaws.com:8082',
      changeOrigin: true,
    })
  );
};

// Add headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// test to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/api', (req, res) => {
  res.json({ message: 'Hello! welcome to our api!' });
});

app.get('/api/file/:lang/:questionId', limiter, async (req, res) => {
  try {
    const language = req.params.lang;
    const { questionId } = req.params;
    console.log(questionId + ' ' + language);

    const release = await semaphore.acquire();
    FileApi.getFile(language, questionId, (content) => {
      const file = {
        lang: language,
        code: content,
      };
      res.send(JSON.stringify(file));
      release();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/run/:questionId', limiter, async (req, res) => {
  const { questionId } = req.params;
  // const file = req.body;
  const { file, userId, userName } = req.body;
  console.log(`file.lang: ${file.lang}`,//
    `file.code:${file.code}`,//
    `questionId: ${questionId}`,
    `userId: ${userId}`,//
    `userName: ${userName}`//
  );

  RunnerManager.run(file.lang, file.code, res, questionId,userId,userName);


});
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));