const { buildConfiguration } = require('../utils');

const environmentVariables = ['port', 'uploadPath'];
const getConfiguration = (defaultConfiguration) =>
  buildConfiguration('server', environmentVariables, defaultConfiguration);

module.exports = {
  getConfiguration,
};
