import React from 'react';

function PreviewYAML({ yaml }) {
  return (
    <div>
      <h2>YAML Preview</h2>
      <pre>{yaml}</pre>
    </div>
  );
}

export default PreviewYAML;
