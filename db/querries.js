const pool = require('./pool');

async function getAllCategories() {
    const { rows } = await pool.query('SELECT * FROM categories');
    return rows;
}

async function getAllCompanies() {
    const { rows } = await pool.query('Select * FROM companies');
    return rows;
}

async function getCategoryGroceries(categoryname) {
    categoryname = categoryname.replace("'", "''");
    const SQL = `
    SELECT * FROM groceries
    WHERE groceries.categoryid = 
        (SELECT id FROM categories WHERE categoryname = '${categoryname}');
    `;
    const { rows } = await pool.query(SQL);
    return rows;
}

async function getCompanyGroceries(companyname) {
    companyname = companyname.replace("'", "''");
    const SQL = `
    SELECT * FROM groceries
    WHERE groceries.companyid =
        (SELECT id FROM companies WHERE companyname = '${companyname}');
    `;
    const { rows } = await pool.query(SQL);
    return rows;
}

async function getItem(groceryname) {
    groceryname = groceryname.replace("'", "''");
    const SQL = `
    SELECT groceryname, price, rating, categoryname, companyname, grocerypath
    FROM ((groceries
        INNER JOIN categories ON groceries.categoryid = categories.id)
        INNER JOIN companies ON groceries.companyid = companies.id)
        WHERE groceryname = '${groceryname}';
    `;

    const { rows } = await pool.query(SQL);
    return rows;
}

async function postAddCategory(categoryname, categorypath) {
    const SQL = `
    INSERT INTO categories (categoryname, categorypath)
    VALUES ($1, $2)
    `;

    await pool.query(SQL, [categoryname, categorypath]);
}

async function postAddCompany(companyname, companypath) {
    const SQL = `
    INSERT INTO companies (companyname, companypath)
    VALUES ($1, $2)
    `;

    await pool.query(SQL, [companyname, companypath]);
}

async function postAddItem(groceryname, price, rating, categoryname, companyname, grocerypath) {
    const categoryid = (await pool.query(`SELECT id FROM categories WHERE categoryname = '${categoryname}'`)).rows[0].id;
    const companyid = (await pool.query(`SELECT id FROM companies WHERE companyname = '${companyname}'`)).rows[0].id;

    const SQL = `
    INSERT INTO groceries (groceryname, price, rating, categoryid, companyid, grocerypath)
    VALUES ($1, $2, $3, $4, $5, $6)
    `;

    await pool.query(SQL, [groceryname, price, rating, categoryid, companyid, grocerypath]);
}

async function deleteItem(groceryname) {
    groceryname = groceryname.replace("'", "''");
    const SQL = `
    DELETE FROM groceries WHERE groceryname = '${groceryname}';
    `;

    await pool.query(SQL);
}

async function deleteCategory(categoryname) {
    categoryname = categoryname.replace("'", "''");
    const SQL = `
    DELETE FROM groceries WHERE categoryid =
        (SELECT id FROM categories WHERE categoryname = '${categoryname}');

    DELETE FROM categories WHERE categoryname = '${categoryname}';
    `;

    await pool.query(SQL);
}

async function deleteCompany(companyname) {
    companyname = companyname.replace("'", "''");
    const SQL = `
    DELETE FROM groceries WHERE companyid =
        (SELECT id FROM companies WHERE companyname = '${companyname}');
    
    DELETE FROM companies WHERE companyname = '${companyname}';
    `;

    await pool.query(SQL);
}

module.exports = {
    getAllCategories,
    getAllCompanies,
    getCategoryGroceries,
    getCompanyGroceries,
    getItem,
    postAddCategory,
    postAddItem,
    postAddCompany,
    deleteItem,
    deleteCategory,
    deleteCompany,
}