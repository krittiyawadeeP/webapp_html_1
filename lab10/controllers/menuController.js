//manual write coding
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getMenus = async (req, res) => {
  try {
    const menus = await prisma.menu.findMany({
      include: {
        type: true,
      },
    });

    res.json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};