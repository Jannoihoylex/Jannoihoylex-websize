const express = require('express');
const mysql = require("mysql2")

const app = express();

const db_config = {
    host: '172.18.40.83',
    user: 'JC2',
    password: 'JC2#14#client',
    database: 'Mysqltest'
};

const connection = mysql.createConnection(db_config);
app.use(express.static('public')); // เพิ่ม middleware เพื่อให้ Express สามารถเข้าถึงไฟล์ในโฟลเดอร์ 'public' ได้



app.get('/data', (req, res) => {
    connection.query('SELECT first_name, last_name FROM Nume', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const data = results.map(row => ({
            first_name: row.first_name,
            last_name: row.last_name,
        }));

        res.json(data);
    });
});

app.get('/Home.html', (req, res) => {
    res.sendFile(__dirname + '/public/Home.html');
});


const port = 8081;

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});
