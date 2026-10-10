//maual write coding
const express = require("express");


const menuRoute = require("./routes/menuRoute");
const typeRoute = require("./routes/typeRoute");

const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use("/api/menu", menuRoute);
app.use("/api/type", typeRoute);

// app.get("/api/menu", async (req, res) => {
//   try {
//     const menus = await prisma.menu.findMany({
//       include: {
//         type: true,
//       },
//     });

//     res.json(menus);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get("/api/type", async (req, res) => {
//   try {
//     const types = await prisma.type.findMany({
//       include: {
//         menu: true,
//       },
//     });

//     res.json(types);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});