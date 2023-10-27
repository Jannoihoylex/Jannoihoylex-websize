document.querySelector('#login-form').addEventListener('submit', (event) => {
    event.preventDefault(); // ไม่ให้ฟอร์มส่งข้อมูลไปยัง URL ที่ระบุใน action
    
    // ดึงข้อมูลผู้ใช้และรหัสผ่านจากฟอร์ม
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // เพิ่มเงื่อนไข: ตรวจสอบรหัสผ่านและชื่อผู้ใช้
    if (username === 'Jan_Amornwan' && password === 'Jan_0613745920') {
        // ถ้ารหัสผ่านและชื่อผู้ใช้ถูกต้อง ให้นำผู้ใช้ไปยังหน้าอื่น
        window.location.href = '/MuMu/NewHome.html';
    } else {
        // ถ้ารหัสผ่านหรือชื่อผู้ใช้ไม่ถูกต้อง ให้แสดงข้อความผิดพลาดและล้างค่าฟิลด์รหัสผ่าน
        alert('Invalid username or password. Please try again.');
        document.getElementById('password').value = ''; // ล้างค่าฟิลด์รหัสผ่าน
        
        // ใช้ window.location.href เพื่อให้อยู่ในหน้า index.html หลังจากแสดงข้อความผิดพลาด
        window.location.href = '/MuMu/Newindex.html';
    }
        // ดึงอ้างอิงไปยังปุ่ม Logout
    const logoutButton = document.getElementById('logoutButton');

        // เพิ่มการจัดการเหตุการณ์คลิกในปุ่ม Logout
    logoutButton.addEventListener('click', () => {
        // นำผู้ใช้กลับไปยังหน้า index.html
    window.location.href = '/MuMu/Newindex.html';
});

});

