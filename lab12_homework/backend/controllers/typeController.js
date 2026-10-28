const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getTypes = async (req, res) => {
  try {
    const types = await prisma.type.findMany({
      include: {
        menu: true,
      },
    });

    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};