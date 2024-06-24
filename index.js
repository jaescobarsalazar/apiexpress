const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors());

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        res.send(`Current Time: ${result.rows[0].now}`);
        client.release();
    } catch (err) {
        console.error(err);
        res.send('Error ' + err);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});