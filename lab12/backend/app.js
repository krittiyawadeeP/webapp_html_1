// D:\webappp\lab12\backend\app.js
const express = require('express');
const path = require('path');

// ดึง Router มาเหมือนใน lab8/todo2
const authenRouter = require(path.join(__dirname, './routes/authen'));

const app = express();
const port = 3000; // ในสไลด์ ch8 หน้า 38 ใช้พอร์ต 3000

app.use(express.json()); // เอาไว้อ่านข้อมูล JSON ที่ส่งมาจากฟอร์ม

// เรียกใช้ Router โดยให้ขึ้นต้นด้วย /authen (ตามสไลด์ ch8 หน้า 35, 38)
app.use('/authen', authenRouter);

// หน้าแรกสุด เอาไว้เช็คว่า Server ติดไหม
app.get('/', (req, res) => {
    res.send('Backend Server is running!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});