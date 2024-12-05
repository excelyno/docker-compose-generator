const express = require('express');
const cors = require('cors');
const generator = require('./routes/generator.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/generate', generator);

const PORT = 2500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
