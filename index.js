const fs = require('fs');

const { getConfiguration } = require('./config');
const { executeSFTPOperation } = require('./sftp');
const { startServer } = require('./server');

// Config functions
const getUploadFilePath = (fileName, serverConfig) => `${serverConfig.uploadPath}${fileName}`;

// Configuration
const defaultConfiguration = {
  sftp: {
    host: 'localhost',
    port: '2222',
    username: 'sapstore',
    password: 'sapstore123!',
  },
  server: {
    port: 8080,
    uploadPath: '/store',
  },
};

// Main functions
const main = async () => {
  const { sftp: sftpConfig, server: serverConfig } = getConfiguration(defaultConfiguration);

  const operations = {
    file_multi_get: async (req, res) => {
      const path = req.query.path || '';
      const items = await executeSFTPOperation((sftp) => sftp.list(`${serverConfig.uploadPath}${path}`), sftpConfig);
      res.send(
        items.map((item) => ({
          name: item.name,
          size: item.size,
          rights: item.rights,
        }))
      );
    },

    file_single_post: async (req, res) => {
      const file = req.file;
      const { path = '' } = req.body;

      const folderPath = getUploadFilePath(path, serverConfig);
      const filePath = getUploadFilePath(`${path}/${file.originalname}`, serverConfig);

      await executeSFTPOperation(async (sftp) => {
        try {
          await sftp.mkdir(folderPath, true);
        } catch (e) {}

        // Response
        const response = await sftp.put(file.buffer, filePath, {
          writeStreamOptions: {
            flags: 'w',
            encoding: null,
            mode: 0o666,
          },
        });
        return response;
      }, sftpConfig);

      res.status(201).send();
    },
  };

  startServer(operations, serverConfig);
};

main();
