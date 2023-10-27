const express = require('express');
const mysql = require("mysql2");

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

    let selectedNumberModule;

    const sqlSelectMode = 'SELECT NumberModule, NameModule FROM selectmode ORDER BY Date DESC, Time DESC LIMIT 1';
    const sqlConditionMode = 'SELECT NumberModule, Char_Height, Dot_Pitch, Density, Print_Position, Speed, Thinning_Way, Thinning_number, Print_Direction, Orientation FROM conditionmode WHERE NumberModule = ?';
    const sqlConditionPhoto = 'SELECT NumberModule, Filter_type, On_Delay, Off_Delay, One_shot, Case_size, Allowable_range, TurnOn_time FROM conditionphoto WHERE NumberModule = ?';
    const sqlConditionRepeat = 'SELECT NumberModule, Use_method, Immediate_stop, Tprint_count, Interval_pitch, Distance, Update_calandar, Update_numbering FROM conditionrepeat WHERE NumberModule = ?';
    const sqlConditionControl = 'SELECT NumberModule, Tracking, Control_During, Back_aligned, Print_end, One_shot, Number_ready, Print_count, Msgchange_pafter, Msgnumber_pafter FROM conditioncontrol WHERE NumberModule = ?';
    const sqlConditionEncoder = 'SELECT NumberModule, Encoder, Pulse_number, Moving_distance, Signal_type, Pulse_multi, Reverse_absorption, Rotation_direct, Speed_following, Excessive_frequency, Print_position FROM conditionencoder WHERE NumberModule = ?';
   
    connection.query(sqlSelectMode, (errSelect, selectResults) => {
        if (errSelect) {
            console.error(errSelect);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (selectResults.lenght === 0) {

            res.status(404).json({ error: 'No data found in selectmode'});
            return;
        }
        
        selectedNumberModule = selectResults[0].NumberModule;

        connection.query(sqlConditionMode, [selectedNumberModule], (errCondition, conditionResults) => {
            if (errCondition) {
                console.error(errCondition);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            connection.query(sqlConditionPhoto, [selectedNumberModule], (errConditionphoto, conditionphotoResults) => {
                if (errConditionphoto) {
                    console.error(errConditionphoto);
                    res.status(500).json({ error: 'Internal Server Error'});
                    return;
                }
            
                connection.query(sqlConditionRepeat, [selectedNumberModule], (errConditionrepeat, conditionrepeatResults) => {
                    if (errConditionrepeat) {
                        console.error(errConditionrepeat);
                        res.status(500).json({ error: 'Internal Server Error'});
                        return;
                    }

                    connection.query(sqlConditionControl, [selectedNumberModule], (errConditioncontrol, conditioncontrolResults) => {
                        if (errConditioncontrol) {
                            console.error(errConditioncontrol);
                            res.status(500).json({ error: 'Internal Server Error'});
                            return;
                        }
                    
                        connection.query(sqlConditionEncoder, [selectedNumberModule], (errConditionencoder, conditionencoderResults) => {
                            if (errConditionencoder) {
                                console.error(errConditionencoder);
                                res.status(500).json({ error: 'Internal Server Error'});
                                return;
                            }
                                                
                            const data = {
                                selectmode: selectResults[0], // เลือกข้อมูล selectmode ตัวแรก
                                conditionmode: conditionResults[0], // เลือกข้อมูล conditionmode ตัวแรก
                                conditionphoto: conditionphotoResults[0],
                                conditionrepeat: conditionrepeatResults[0],
                                conditioncontrol: conditioncontrolResults[0],
                                conditionencoder: conditionencoderResults[0],
                                                                            
                                };
                                        
                            res.json(data);
                                                             
                        });
                    });
                });    
            });
        });
    });
});

app.get('/dataWorklog', (req, res) => {
    connection.query('SELECT * FROM worklog', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const reversedResults = results.reverse();

        const dataWorklog = results.map(row => ({
            Date: row.Date,
            Time: row.Time,
            Log_code: row.Log_code,
            Detail_code: row.Detail_code,
        }));

        res.json(dataWorklog);
    });
});

app.get('/dataAlarmlog', (req, res) => {
    connection.query('SELECT * FROM alarmlog', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const reversedResults = results.reverse();

        const dataAlarmlog = results.map(row => ({
            Date: row.Date,
            Time: row.Time,
            Log_code: row.Log_code,
            Detail_code: row.Detail_code,
        }));

        res.json(dataAlarmlog);
    });
});

app.get('/dataInk', (req, res) => {
    connection.query('SELECT * FROM ink', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const reversedResults = results.reverse();

        const dataInk = results.map(row => ({
            Date: row.Date,
            Time: row.Time,
            Log_code: row.Log_code,
            Detail_code: row.Detail_code,
        }));

        res.json(dataInk);
    });
});

app.get('/dataExternalif', (req, res) => {
    connection.query('SELECT * FROM externalif', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const reversedResults = results.reverse();

        const dataExternalif = results.map(row => ({
            Date: row.Date,
            Time: row.Time,
            Log_code: row.Log_code,
            Detail_code: row.Detail_code,
        }));

        res.json(dataExternalif);
    });
});

app.get('/dataMeasuremode', (req, res) => {
    connection.query('SELECT * FROM measuremode', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const reversedResults = results.reverse();

        const dataMeasuremode = results.map(row => ({
            Record_date: row.Record_date,
            Record_time: row.Record_time,
            Run_Mode: row.Run_Mode,
            Viscosity: row.Viscosity,
            Supply: row.Supply,
            Intake_air: row.Intake_air,
            Head_temp: row.Head_temp,
            Gun_temp: row.Gun_temp,
            Ink_chamber: row.Ink_chamber,
            Board_chamber: row.Board_chamber,
            Ink_temp: row.Ink_temp,
            Piezo: row.Piezo,
            Charge_detect: row.Charge_detect,
            Solvent_supply: row.Solvent_supply,
            Pressure: row.Pressure,
        }));

        res.json(dataMeasuremode);
    });
});

app.get('/dataSelectmode', (req, res) => {
    connection.query('SELECT * FROM selectmode', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const reversedResults = results.reverse();

        const dataSelectmode = results.map(row => ({
            Date: row.Date,
            Time: row.Time,
            NumberModule: row.NumberModule,
            NameModule: row.NameModule,
        }));

        res.json(dataSelectmode);
    });
});

app.get('/dataTextmodule', (req, res) => {
    connection.query('SELECT * FROM textmodule', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const dataTextmodule = results.map(row => ({
            Number_TextM: row.Number_TextM,
            Content: row.Content,
            
        }));

        res.json(dataTextmodule);
    });
});

app.get('/dataLimitmodule', (req, res) => {
    connection.query('SELECT * FROM limitmodule', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const dataLimitmodule = results.map(row => ({
            Number_LimitM: row.Number_LimitM,
            Content_LimitM: row.Content_LimitM,
            Year_offset: row.Year_offset,
            Month_offset: row.Month_offset,
            Day_offset: row.Day_offset,
            Hour_offset: row.Hour_offset,
            Minute_offset: row.Minute_offset,
        }));

        res.json(dataLimitmodule);
    });
});

app.get('/dataNumberingmodule', (req, res) => {
    connection.query('SELECT * FROM numberingmodule', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const dataNumberingmodule = results.map(row => ({
            Number_NumberM: row.Number_NumberM,
            Content_NumberM: row.Content_NumberM,
          
        }));

        res.json(dataNumberingmodule);
    });
});

app.get('/dataBarcodemodule', (req, res) => {
    connection.query('SELECT * FROM barcodemodule', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const dataBarcodemodule = results.map(row => ({
            Number_BarcodeM: row.Number_BarcodeM,
            Content_BarcodeM: row.Content_BarcodeM,
          
        }));

        res.json(dataBarcodemodule);
    });
});

app.get('/dataTwodcodemodule', (req, res) => {
    connection.query('SELECT DISTINCT Number_2DcodeM, Content_2DcodeM FROM 2dcodemodule', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const dataTwodcodemodule = results.map(row => ({
            Number_2DcodeM: row.Number_2DcodeM,
            Content_2DcodeM: row.Content_2DcodeM,
          
        }));

        res.json(dataTwodcodemodule);
    });
});

app.get('/dataDistancemodule', (req, res) => {
    connection.query('SELECT DISTINCT id_Module, Content_DisM FROM distancemodule', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const dataDistancemodule = results.map(row => ({
            id_Module: row.id_Module,
            Content_DisM: row.Content_DisM,
          
        }));

        res.json(dataDistancemodule);
    });
});

app.get('/dataIntervalmodule', (req, res) => {
    connection.query('SELECT * FROM intervalmodule', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const dataIntervalmodule = results.map(row => ({
            Number_IntervalM: row.Number_IntervalM,
            Interval_specified: row.Interval_specified,
            Interval_mm: row.Interval_mm,
          
        }));

        res.json(dataIntervalmodule);
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





app.get('/dataStatus', (req, res) => {
    connection.query('SELECT Running_control FROM statusrunning ORDER BY Date DESC, Time DESC LIMIT 1', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const reversedResults = results.reverse();

        const data = results.map(row => ({
            Date: row.Date,
            Time: row.Time,
            Running_control: row.Running_control,
        }));

        res.json(data);
    });
});

app.get('/dataRSM', (req, res) => {
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
    const insertQuery = 'INSERT INTO RSM (action) VALUES (?)';

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


app.get('/insertAction', (req, res) => {
    // โค้ดสำหรับคำขอ GET
    res.send('This is a GET request to /insertAction'); // เช่น ส่งข้อความออกไป
});
















app.get('/MuMu/Newhome.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/Newhome.html');
}); 

app.get('/MuMu/Newindex.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/Newindex.html');
});

app.get('/MuMu/Selection.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/Selection.html');
});

app.get('/MuMu/C1condition.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/C1condition.html');
});

app.get('/MuMu/C2photocell.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/C2photocell.html');
});

app.get('/MuMu/C3repeat.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/C3repeat.html');
});

app.get('/MuMu/C4control.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/C4control.html');
});

app.get('/MuMu/C5encoder.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/C5encoder.html');
});

app.get('/MuMu/W1worklog.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/W1worklog.html');
});

app.get('/MuMu/W2alarmlog.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/W2alarmlog.html');
});

app.get('/MuMu/W3ink.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/W3ink.html');
});

app.get('/MuMu/W4externalif.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/W4externalif.html');
});

app.get('/MuMu/M1measurement.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/M1measurement.html');
});

app.get('/MuMu/M2temp.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/M2temp.html');
});

app.get('/MuMu/M3run.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/M3run.html');
});

app.get('/MuMu/M4others.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/M4others.html');
});

app.get('/MuMu/E1edit.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/E1edit.html');
});

app.get('/MuMu/E2textmodule.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/E2textmodule.html');
});

app.get('/MuMu/E3calendarmodule.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/E3calendarmodule.html');
});

app.get('/MuMu/E4numberingmodule.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/E4numberingmodule.html');
});

app.get('/MuMu/E5barcodemodule.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/E5barcodemodule.html');
});

app.get('/MuMu/E6twodcodemodule.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/E6twodcodemodule.html');
});

app.get('/MuMu/E7distancemodule.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/E7distancemodule.html');
});

app.get('/MuMu/E8intervalmodule.html', (req, res) => {
    res.sendFile(__dirname + '/MuMu/E8intervalmodule.html');
});




const port = 8086;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 
