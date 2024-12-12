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

async function postAddCategory(categoryname) {
    const SQL = `
    INSERT INTO categories (categoryname)
    VALUES ($1)
    `;

    await pool.query(SQL, [categoryname]);
}

async function postAddCompany(companyname) {
    const SQL = `
    INSERT INTO companies (companyname)
    `
}

async function postAddItem(groceryname, price, rating, categoryname, companyname) {
    const categoryid = (await pool.query(`SELECT id FROM categories WHERE categoryname = '${categoryname}'`)).rows[0].id;
    const companyid = (await pool.query(`SELECT id FROM companies WHERE companyname = '${companyname}'`)).rows[0].id;

    const SQL = `
    INSERT INTO groceries (groceryname, price, rating, categoryid, companyid)
    VALUES ($1, $2, $3, $4, $5)
    `;

    await pool.query(SQL, [groceryname, price, rating, categoryid, companyid]);
}

module.exports = {
    getAllCategories,
    getAllCompanies,
    getCategoryGroceries,
    getItem,
    postAddCategory,
    postAddItem,
}