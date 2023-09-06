import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class Main {
    public static void main(String[] args) {
        try {
            // กำหนดค่าการเชื่อมต่อฐานข้อมูล
            String jdbcUrl = "jdbc:mysql://172.18.40.83/Mysqltest";
            String username = "JC2";
            String password = "JC2#14#client";

            // เชื่อมต่อฐานข้อมูล
            Connection connection = DriverManager.getConnection(jdbcUrl, username, password);

            // สร้าง statement เพื่อดำเนินการกับฐานข้อมูล
            Statement statement = connection.createStatement();

            // คำสั่ง SQL เพื่อดึงข้อมูล
            String selectQuery = "SELECT * FROM Nume";

            // ดำเนินการดึงข้อมูล
            ResultSet resultSet = statement.executeQuery(selectQuery);

            // แสดงผลข้อมูล
            while (resultSet.next()) {
                String column1Value = resultSet.getString(1);
                String column2Value = resultSet.getString(2);
                System.out.println(column1Value + ", " + column2Value);
            }

            // ปิด statement และการเชื่อมต่อ
            statement.close();
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
