import mysql.connector

# กำหนดค่าการเชื่อมต่อฐานข้อมูล
db_config = {
    "host": "172.18.40.83",
    "user": "JC2",
    "password": "JC2#14#client",
    "database": "Mysqltest"
}

# เชื่อมต่อฐานข้อมูล
connection = mysql.connector.connect(**db_config)

# สร้าง cursor object เพื่อดำเนินการกับฐานข้อมูล
cursor = connection.cursor()

# คำสั่ง SQL เพื่อดึงข้อมูล
select_query = "SELECT * FROM Nume"

# ดำเนินการดึงข้อมูล
cursor.execute(select_query)
results = cursor.fetchall()

# แสดงผลข้อมูล
for row in results:
    print(f"{row[0]}")
    # แปลง tuple เป็นข้อความ
    row_text = ', '.join(str(item) for item in row)
    print(row_text)

# ปิด cursor และการเชื่อมต่อ
cursor.close()
connection.close()
data = [
    ('bn', 'bn, Poy'),
    ('km', 'km, mi'),
    ('PLOY', 'PLOY, RASP'),
]

template_data = {
    'data': data
}