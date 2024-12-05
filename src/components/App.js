import React, { useState } from 'react';
import ContainerForm from './ContainerForm';
import PreviewYAML from './PreviewYAML';

function App() {
  const [containers, setContainers] = useState([]);
  const [yaml, setYaml] = useState('');

  const addContainer = (container) => {
    setContainers([...containers, container]);
  };

  const generateYAML = async () => {
    const response = await fetch('http://localhost:5000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ containers }),
    });
    const data = await response.text();
    setYaml(data);
  };

  return (
    <div>
      <h1>Docker Compose Generator</h1>
      <ContainerForm addContainer={addContainer} />
      <button onClick={generateYAML}>Generate YAML</button>
      <PreviewYAML yaml={yaml} />
    </div>
  );
}

export default App;
