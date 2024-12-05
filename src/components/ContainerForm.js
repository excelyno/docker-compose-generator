import React, { useState } from 'react';

function ContainerForm({ addContainer }) {
  const [container, setContainer] = useState({
    name: '',
    image: '',
    ports: '',
    environment: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addContainer(container);
    setContainer({ name: '', image: '', ports: '', environment: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Container Name"
        value={container.name}
        onChange={(e) => setContainer({ ...container, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Docker Image (e.g., nginx:latest)"
        value={container.image}
        onChange={(e) => setContainer({ ...container, image: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Ports (e.g., 8080:80)"
        value={container.ports}
        onChange={(e) => setContainer({ ...container, ports: e.target.value })}
      />
      <textarea
        placeholder="Environment Variables (key=value, one per line)"
        value={container.environment}
        onChange={(e) =>
          setContainer({ ...container, environment: e.target.value })
        }
      ></textarea>
      <button type="submit">Add Container</button>
    </form>
  );
}

export default ContainerForm;
