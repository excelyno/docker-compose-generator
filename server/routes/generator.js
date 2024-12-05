const express = require('express');
const yaml = require('yaml');

const router = express.Router();

/**
 * Endpoint untuk menerima konfigurasi kontainer dan menghasilkan file Docker Compose.
 */
router.post('/', (req, res) => {
  try {
    const { containers } = req.body;

    if (!containers || !Array.isArray(containers)) {
      return res.status(400).json({ error: 'Invalid input: containers must be an array' });
    }

    const composeFile = {
      version: '3.9',
      services: {},
    };

    const usedPorts = new Set();

    containers.forEach((container) => {
      // Validasi setiap kontainer
      if (!container.name || !container.image || !container.ports) {
        throw new Error(
          `Invalid container configuration: Each container must have a name, image, and ports`
        );
      }

      const ports = container.ports.split(',').map((portMapping) => {
        const [hostPort, containerPort] = portMapping.split(':');

        // Pastikan tidak ada port yang bentrok
        if (usedPorts.has(hostPort)) {
          throw new Error(`Port conflict detected: Port ${hostPort} is already in use`);
        }

        usedPorts.add(hostPort);
        return `${hostPort}:${containerPort}`;
      });

      // Menambahkan kontainer ke file Docker Compose
      composeFile.services[container.name] = {
        image: container.image,
        ports,
        environment: container.environment
          ? container.environment.split('\n').filter((line) => line.includes('='))
          : [],
      };
    });

    // Konversi file menjadi YAML
    const yamlOutput = yaml.stringify(composeFile);
    res.status(200).send({ yaml: yamlOutput });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
