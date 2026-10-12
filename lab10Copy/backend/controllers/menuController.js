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

exports.createMenu = async (req, res) => {
  try {
    const { menuId, name, price, isBestSeller, typeId } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ error: "name and price are required" });
    }

    const latestMenu = await prisma.menu.findFirst({
      orderBy: {
        menuId: "desc",
      },
    });

    const newMenu = await prisma.menu.create({
      data: {
        menuId: menuId ? Number(menuId) : (latestMenu?.menuId || 0) + 1,
        name,
        price,
        isBestSeller: Boolean(isBestSeller),
        typeId: typeId ? Number(typeId) : null,
      },
    });

    res.status(201).json(newMenu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, isBestSeller, typeId } = req.body;

    const updatedMenu = await prisma.menu.update({
      where: {
        menuId: Number(id),
      },
      data: {
        name,
        price,
        isBestSeller: isBestSeller === undefined ? undefined : Boolean(isBestSeller),
        typeId: typeId === undefined ? undefined : typeId ? Number(typeId) : null,
      },
    });

    res.json(updatedMenu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.menu.delete({
      where: {
        menuId: Number(id),
      },
    });

    res.json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
