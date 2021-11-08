const getEnvVariableName = (configName, variable) =>
  `${configName.toUpperCase()}_${variable
    .split(' ')
    .map((variablePart) => variablePart.toUpperCase())
    .join('_')}`;

const buildConfiguration = (configName, attributes, defaultValues = {}) =>
  attributes.reduce((configuration, attribute) => {
    const environmentVariable = getEnvVariableName(configName, attribute);
    configuration[attribute] = process.env[environmentVariable] || defaultValues[attribute];
    return configuration;
  }, {});

module.exports = {
  getEnvVariableName,
  buildConfiguration,
};
