const Client = require('ssh2-sftp-client');

let client = null;
const getClient = () => {
  client = client || new Client();
  return client;
};

const executeSFTPOperation = async (operation, configuration = {}) => {
  const client = getClient();
  try {
    await client.connect(configuration);
    const responseOperation = await operation(client);
    return responseOperation;
  } catch (e) {
    throw e;
  } finally {
    await client.end();
  }
};

module.exports = {
  executeSFTPOperation,
};
