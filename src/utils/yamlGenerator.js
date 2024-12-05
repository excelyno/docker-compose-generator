import yaml from 'yaml';

export const generateComposeYAML = (containers) => {
  const composeFile = {
    version: '3.9',
    services: {},
  };

  containers.forEach((container) => {
    composeFile.services[container.name] = {
      image: container.image,
      ports: container.ports.split(',').map((port) => port.trim()),
      environment: container.environment
        .split('\n')
        .filter((line) => line.includes('=')),
    };
  });

  return yaml.stringify(composeFile);
};
