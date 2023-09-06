from flask import Flask, render_template
import mysql.connector

app = Flask(__name__)

# กำหนดค่าการเชื่อมต่อฐานข้อมูล
db_config = {
    "host": "26.107.253.70",
    "user": "JC1",
    "password": "JC1#14#testcl",
    "database": "Mysqltest"
}

@app.route('/')
def show_data():
    # เชื่อมต่อฐานข้อมูล
    connection = mysql.connector.connect(**db_config)

    # สร้าง cursor object เพื่อดำเนินการกับฐานข้อมูล
    cursor = connection.cursor()

    # คำสั่ง SQL เพื่อดึงข้อมูล
    select_query = "SELECT * FROM Nume"

    # ดำเนินการดึงข้อมูล
    cursor.execute(select_query)
    results = cursor.fetchall()

    # ปิด cursor และการเชื่อมต่อ
    cursor.close()
    connection.close()

    return render_template('data.html', results=results)

if __name__ == '__main__':
    app.run()
