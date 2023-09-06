document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); // ป้องกันแบบฟอร์มส่งข้อมูลใหม่

        // รับค่าชื่อผู้ใช้และรหัสผ่านที่ผู้ใช้ป้อน
        var username = document.getElementById("Amornwan").value;
        var password = document.getElementById("123456789").value;

        var expectedPassword = "mypassword"; // รหัสผ่านที่คุณต้องการ

        if (password === expectedPassword) {
            alert("เข้าสู่ระบบสำเร็จ!");
            var nextPageURL = "Home.html";
            window.location.href = nextPageURL;
        } else {
            alert("รหัสผ่านไม่ถูกต้อง โปรดลองอีกครั้ง");
        }
    });
});
