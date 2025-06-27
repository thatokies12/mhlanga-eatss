const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config();
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/index'));


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(authRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 
