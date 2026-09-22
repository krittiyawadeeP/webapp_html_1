const express = require("express");
const path = require("path");

const restaurantRouter = require(path.join(__dirname, './routes/resterant'));

const app = express();
const port = 8080;


// แปลว่า browser จะมองไฟล์ใน public เป็น root URL ทันที เช่น:
app.use(express.static(path.join(__dirname,'public')));
app.use(restaurantRouter);
app.listen(port, ()=>{
    console.log(`server is runing port at http://localhost:${port}`);
});

// const po