// D:\webappp\lab12\backend\routes\authen.js
const express = require('express');
const router = express.Router();

// ทดสอบเข้าผ่าน Browser ก่อนด้วย GET (เหมือน lab8)
router.get('/', (req, res) => {
    res.send('<h1>Authen Route Working!</h1>');
});

router.get('/home', (req, res) => {
    res.send('<h1>Welcome to Home API</h1>');
});

// โครงตามสไลด์ ch8 หน้า 26 (เตรียมไว้สำหรับสมัครและล็อกอิน)
router.post('/register', async (req, res) => {
    res.send('Register endpoint');
});

router.post('/login', async (req, res) => {
    res.send('Login endpoint');
});

module.exports = router;