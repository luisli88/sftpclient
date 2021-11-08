const fs = require('fs');

const CONFIG_FOLDER = 'config';

const getConfiguration = (defaultConfiguration = {}) =>
  fs
    .readdirSync(`${__dirname}/${CONFIG_FOLDER}`)
    .filter((filename) => filename.endsWith('.js'))
    .map((filename) => filename.split('.').shift())
    .reduce((configuration, configName) => {
      const fileConfiguration = require(`./${CONFIG_FOLDER}/${configName}`);
      configuration[configName] = fileConfiguration.getConfiguration(defaultConfiguration[configName] || {});
      return configuration;
    }, {});

module.exports = {
  getConfiguration,
};
