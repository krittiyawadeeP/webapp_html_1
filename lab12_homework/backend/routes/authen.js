const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. REGISTER (สไลด์หน้า 27)
router.post('/register', async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    // เช็คว่ามี username หรือ email ซ้ำไหม
    const getUser = await prisma.user.findMany({
      where: {
        OR: [{ userName: userName }, { email: email }]
      }
    });

    if (getUser.length > 0) {
      return res.status(409).json({ message: "Duplicate Username or Email" });
    }

    // Hash รหัสผ่านด้วย bcrypt
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        userName,
        email,
        password: hashPassword,
        role: 'user'
      }
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. LOGIN (สไลด์หน้า 30, 35)
router.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  try {
    const getUser = await prisma.user.findMany({
      where: { userName: userName }
    });

    if (getUser.length === 0) {
      return res.status(404).json({ message: "Unknown Username" });
    }

    const isMatch = await bcrypt.compare(password, getUser[0].password);
    if (!isMatch) {
      return res.status(404).json({ message: "Password Incorrect" });
    }

    // สร้าง Token
    const token = jwt.sign(
      { userId: getUser[0].userId },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ message: "Login Success", token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. MIDDLEWARE ตรวจสอบ Token (สไลด์หน้า 36)
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(403).json({ message: "no token provide" });
    }
    const token = authHeader.split(' ')[1];
    if (!token || token === "null") {
      return res.status(403).json({ message: "no token provide" });
    }

    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decode.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// 4. GET USER INFO สำหรับหน้า HOME (สไลด์หน้า 37)
router.get('/home', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const getUser = await prisma.user.findMany({
      where: { userId: userId },
      select: {
        userId: true,
        userName: true,
        email: true,
        role: true
      }
    });

    if (getUser.length === 0) {
      return res.status(404).json({ message: "User not exist" });
    }

    return res.status(200).json({ user: getUser });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
});

// ดึงรายชื่อ User ทั้งหมด (สำหรับ Admin mode หน้า 55)
router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { userId: true, userName: true, email: true, role: true }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// อัปเดตเปลี่ยน Role ของ User (admin <-> user)
router.put('/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const updatedUser = await prisma.user.update({
      where: { userId: Number(id) },
      data: { role: role }
    });
    res.status(200).json({ message: "Update role success", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;