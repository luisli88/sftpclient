const { buildConfiguration } = require('../utils');

const environmentVariables = ['host', 'port', 'username', 'password'];
const getConfiguration = (defaultConfiguration) =>
  buildConfiguration('sftp', environmentVariables, defaultConfiguration);

module.exports = {
  getConfiguration,
};
