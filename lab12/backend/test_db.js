const express = require('express');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const app = express();
const port = 3000;

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/menu', async (req, res) => {
    try {
        const menu = await prisma.menu.findMany();
        res.send(menu);
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");
    }
});

app.listen(port, () => {
    console.log("server start at port ", port)
})