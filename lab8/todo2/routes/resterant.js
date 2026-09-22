// /home , menu ,order ,itm...
const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, '../index.htm'));
})

router.get('/home',(req, res) => {
    res.sendFile(path.join(__dirname, '../index.htm'));
})

router.get('/menu',(req, res) => {
    res.sendFile(path.join(__dirname, '../info/menu.htm'));
})

router.get('/order',(req,res) => {
    res.sendFile(path.join(__dirname,'../info/order.htm'))
})


router.get('/item/:name/price/:price',(req,res) => {
    const name = req.params.name;
    const price = req.params.price;

    res.send(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>details Menu</title>

    <style>
        .con {
            background-color: blue;
            display: flex;
            justify-content: center;
            align-items: center;
            color : white;
            flex-direction: column;
        }
    </style>
</head>

<body>
    <div class="con">
        <h1>${name}</h1>
        <h2>ราคา ${price} บาท</h2>
        <a href="/menu">menu</a>
    </div>


</body>

</html>`);
})
module.exports = router;


// สัญลักษณ์ :id คือการบอกว่าตรงนี้คือตัวแปรนะ ตัวอย่าง
// router.get('/user/:id', (req, res) => {
//     const userId = req.params.id; // จะได้ค่า "tony"
//     res.send(`กำลังแสดงโปรไฟล์ของ: ${userId}`);
// })
