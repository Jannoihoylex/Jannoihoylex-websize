const express = require('express');
const mysql = require("mysql2");

const app = express();

const db_config = {
    host: '172.18.40.83',
    user: 'JC2',
    password: 'JC2#14#client',
    database: 'Mysqltest'
    
};

const connection = mysql.createConnection(db_config);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.use(express.static('public'));

app.get('/data', (req, res) => {
    connection.query('SELECT Date, Time FROM selectmode LIMIT 2', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const data = results.map(row => ({
            Date: row.Date,
            Time: row.Time,
        }));

        res.json(data);
    });
});

app.get('/MuMu/Newhome.html', (req, res) => {
    res.sendFile(__dirname + '/Newhome.html');
}); // ตรวจสอบว่ามี ; ต่อท้ายคำสั่งนี้

const port = 8086;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
