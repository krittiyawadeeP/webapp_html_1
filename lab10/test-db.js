
// const { PrismaClient } = require("./generated/prisma");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const menus = await prisma.menu.findMany();
  console.log("เชื่อมต่อฐานข้อมูลสำเร็จ!");
  console.log("จำนวนเมนู:", menus.length);
  console.log(menus);
}

main()
  .catch((error) => {
    console.error("เกิดข้อผิดพลาด:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
