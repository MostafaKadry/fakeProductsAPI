const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
}));
// Middleware to parse JSON
app.use(express.json());

// Endpoint to get all data from db.json
app.get('/api/products', (req, res) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading db.json:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
