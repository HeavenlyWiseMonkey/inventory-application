const pool = require('./pool');

async function getAllCategories() {
    const { rows } = await pool.query('SELECT * FROM categories');
    return rows;
}

async function getAllCompanies() {
    const { rows } = await pool.query('Select * FROM companies');
    return rows;
}

async function getCategoryGroceries(category) {
    const SQL = `
    SELECT * FROM groceries
    WHERE groceries.categoryid = 
        (SELECT id FROM categories WHERE categoryname = '${category}');
    `;
    const { rows } = await pool.query(SQL);
    return rows;
}

async function getItem(item) {
    const { rows } = await pool.query(`SELECT * FROM groceries WHERE groceryname = '${item}'`);
    return rows;
}

module.exports = {
    getAllCategories,
    getAllCompanies,
    getCategoryGroceries,
    getItem,
}