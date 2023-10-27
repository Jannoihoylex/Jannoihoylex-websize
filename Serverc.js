const express = require('express');
const mysql = require("mysql2");
const cors = require('cors');

const app = express();

const db_config = {
    host:'26.107.253.70', //'172.18.40.83', 
    user: 'JC1', //'JC2',
    password:'JC1#14#testcl',  //'JC2#14#client',
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

app.use(express.static('MuMu'));

app.get('/data', (req, res) => {
    const sqlSelectMode = 'SELECT NumberModule, NameModule FROM selectmode ORDER BY Date DESC, Time DESC LIMIT 1';

    
    const sqlConditionMode = 'SELECT Char_Height, Dot_Pitch, Density, Print_Position, Speed, Thinning_Way, Thinning_number, Print_Direction, Orientation FROM conditionmode LIMIT 1';
    const sqlConditionPhoto = 'SELECT Filter_type, On_Delay, Off_Delay, One_shot, Case_size, Allowable_range, TurnOn_time FROM conditionphoto LIMIT 1';
    const sqlConditionRepeat = 'SELECT Use_method, Immediate_stop, Tprint_count, Interval_pitch, Distance, Update_calandar, Update_numbering FROM conditionrepeat LIMIT 1';
    const sqlConditionControl = 'SELECT Tracking, Control_During, Back_aligned, Print_end, One_shot, Number_ready, Print_count, Msgchange_pafter, Msgnumber_pafter FROM conditioncontrol LIMIT 1';
    const sqlConditionEncoder = 'SELECT Encoder, Pulse_number, Moving_distance, Signal_type, Pulse_multi, Reverse_absorption, Rotation_direct, Speed_following, Excessive_frequency, Print_position FROM conditionencoder LIMIT 1';
   
    connection.query(sqlSelectMode, (errSelect, selectResults) => {
        if (errSelect) {
            console.error(errSelect);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        connection.query(sqlConditionMode, (errCondition, conditionResults) => {
            if (errCondition) {
                console.error(errCondition);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            connection.query(sqlConditionPhoto, (errConditionphoto, conditionphotoResults) => {
                if (errConditionphoto) {
                    console.error(errConditionphoto);
                    res.status(500).json({ error: 'Internal Server Error'});
                    return;
                }
            
                connection.query(sqlConditionRepeat, (errConditionrepeat, conditionrepeatResults) => {
                    if (errConditionrepeat) {
                        console.error(errConditionrepeat);
                        res.status(500).json({ error: 'Internal Server Error'});
                        return;
                    }

                    connection.query(sqlConditionControl, (errConditioncontrol, conditioncontrolResults) => {
                        if (errConditioncontrol) {
                            console.error(errConditioncontrol);
                            res.status(500).json({ error: 'Internal Server Error'});
                            return;
                        }
                    
                        connection.query(sqlConditionEncoder, (errConditionencoder, conditionencoderResults) => {
                            if (errConditionencoder) {
                                console.error(errConditionencoder);
                                res.status(500).json({ error: 'Internal Server Error'});
                                return;
                            }
                                                
                            const data = {
                                selectmode: selectResults[0], // เลือกข้อมูล selectmode ตัวแรก
                                
                                };
                                        
                            res.json(data);
                                                             
                        });
                    });
                });    
            });
        });
    });
});


app.get('/dataCondiSelect', (req, res) => {
    connection.query('SELECT * FROM conditionmode', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const dataCondiSelect = results.map(row => ({
            NumberModule: row.NumberModule,
            NameModule: row.NameModule,
                     
        }));

        res.json(dataCondiSelect);
    });
});





app.get('/data', (req, res) => {
    connection.query('SELECT * FROM RSM', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const reversedResults = results.reverse();

        const data = results.map(row => ({
            id: row.id,
            timestamp: row.timestamp,
            action: row.action,
        }));

        res.json(data);
    });
});

app.use(express.json()); // เพิ่ม middleware นี้เพื่อแปลงข้อมูล JSON

app.post('/insertAction', (req, res) => {
    const newActionValue = req.body.actionValue;

    // สร้างคำขอ SQL สำหรับการแทรกข้อมูลใหม่
    const insertQuery = 'INSERT INTO selectc (action) VALUES (?)';

    // ดำเนินการแทรกข้อมูลใหม่ลงในฐานข้อมูล
    connection.query(insertQuery, [newActionValue], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // ส่งการตอบกลับเมื่อการแทรกสำเร็จ
        res.json({ success: true });
    });
});


app.get('/select.html', (req, res) => {
    res.sendFile(__dirname + '/select.html');
}); 

app.use(cors({
    origin: 'https://jannoihoylex.github.io',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}))

app.get('/data', (req, res) => {
    // ส่งข้อมูลกลับไปให้เว็บแอปของคุณ
    res.header('Access-Control-Allow-Origin', 'https://jannoihoylex.github.io'); // อนุญาตให้เข้าถึงข้อมูลจากเว็บไซต์ของคุณ
    res.json({ message: 'Hello from localhost:8080' });
});




const port = 8080;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 


