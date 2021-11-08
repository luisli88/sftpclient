const express = require('express');
const multer = require('multer');
const cors = require('cors');

const memoryStorage = multer.memoryStorage();
const uploadConfiguration = multer({
  storage: memoryStorage,
  preservePath: false,
});

let app = null;
const getServer = () => {
  app = app || express();
  return app;
};

const operationExecution = async (operationName, req, res, operations = {}) => {
  try {
    const operation = operations[operationName];
    if (!operation) {
      throw new Error('Operations is not defined.');
    }
    const response = await operation(req, res);
    return response;
  } catch (e) {
    res.status(500).send(JSON.stringify(e));
  }
};

const startServer = (operations = {}, serverConfig = {}) => {
  const app = getServer();

  app.use(cors());

  app.get('/file', async (req, res) => await operationExecution('file_multi_get', req, res, operations));
  app.post(
    '/file',
    uploadConfiguration.single('file'),
    async (req, res) => await operationExecution('file_single_post', req, res, operations)
  );

  const port = serverConfig.port || 8080;
  console.log(`Server started at ${port}`);
  app.listen(port);
};

module.exports = {
  getServer,
  startServer,
};
