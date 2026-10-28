const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const getMenus = async (req, res) => {

    try {
        let menus = await prisma.menu.findMany();
        res.json(menus);

    } catch (err) {
        console.error('Error fetching customers:', err);
        res.status(500).json({ error: 'Database error' });
    }

};


const getMenuById = async (req, res) => {
    const { id } = req.params;
    try {
        const menu = await prisma.menu.findUnique({
            where: { id: Number(id) }
        });
        if (!menu) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(menu);
    } catch (err) {
        console.error('Error fetching menu:', err);
        res.status(500).json({ error: 'Database error' });
    }
};


// const createMenu = async (req, res) => {

//     let { fName, lName, province } = req.body;

//     if (!fName || !lName || !province) {

//         return res.status(400).json({ error: 'Name and province are required' });

//     }

//     try {

//         const newCustomer = await prisma.customers.create({

//             data: {

//                 fName: fName,

//                 lName: lName,

//                 province: Number(province)

//             }

//         });

//         res.status(201).json(newCustomer);

//     } catch (err) {

//         console.error('Error creating customer:', err);

//         res.status(500).json({ error: 'Database error' });

//     }

// };

// Create

// const updateCustomer = async (req, res) => {

//     const { id } = req.params;

//     const { fName, lName, province } = req.body;

//     try {

//         const updatedCustomer = await prisma.customers.update({

//             where: { id: Number(id) },

//             data: {

//                 fName: fName,

//                 lName: lName,

//                 province: Number(province)

//             }

//         });

//         res.json(updatedCustomer);

//     } catch (err) {

//         console.error('Error updating customer:', err);

//         res.status(404).json({ error: 'Customer not found or database error' });

//     }

// };

// Update

// const deleteCustomer = async (req, res) => {

//     const { id } = req.params;

//     try {

//         await prisma.customers.delete({

//             where: { id: Number(id) }

//         });

//         res.json({ message: 'Customer deleted successfully', id: Number(id) });

//     } catch (err) {

//         console.error('Error deleting customer:', err);

//         res.status(404).json({ error: 'Customer not found' });

//     }

// };