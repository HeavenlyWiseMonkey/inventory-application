const pool = require('./pool');
const fs = require('node:fs');

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
    SELECT groceryname, price, rating, categoryname, companyname, groceryimage
    FROM ((groceries
        INNER JOIN categories ON groceries.categoryid = categories.id)
        INNER JOIN companies ON groceries.companyid = companies.id)
        WHERE groceryname = '${groceryname}';
    `;

    const { rows } = await pool.query(SQL);
    return rows;
}

async function postAddCategory(categoryname, categoryimage) {
    const SQL = `
    INSERT INTO categories (categoryname, categoryimage)
    VALUES ($1, $2)
    `;

    await pool.query(SQL, [categoryname, categoryimage]);
}

async function postAddCompany(companyname, companyimage) {
    const SQL = `
    INSERT INTO companies (companyname, companyimage)
    VALUES ($1, $2)
    `;

    await pool.query(SQL, [companyname, companyimage]);
}

async function postAddItem(groceryname, price, rating, categoryname, companyname, groceryimage) {
    const categoryid = (await pool.query(`SELECT id FROM categories WHERE categoryname = '${categoryname}'`)).rows[0].id;
    const companyid = (await pool.query(`SELECT id FROM companies WHERE companyname = '${companyname}'`)).rows[0].id;

    const SQL = `
    INSERT INTO groceries (groceryname, price, rating, categoryid, companyid, groceryimage)
    VALUES ($1, $2, $3, $4, $5, $6)
    `;

    await pool.query(SQL, [groceryname, price, rating, categoryid, companyid, groceryimage]);
}

async function deleteItem(groceryname) {
    groceryname = groceryname.replace("'", "''");

    const groceryImage = (await pool.query(`SELECT groceryimage FROM groceries WHERE groceryname = '${groceryname}';`)).rows[0].groceryimage;

    const path = `public/images/${groceryImage}`;

    fs.unlink(path, err => {
        if (err) throw err;
        console.log(`${groceryImage} was deleted`);
    });

    const SQL = `
    DELETE FROM groceries WHERE groceryname = '${groceryname}';
    `;

    await pool.query(SQL);
}

async function deleteCategory(categoryname) {
    categoryname = categoryname.replace("'", "''");

    const categoryImage = (await pool.query(`SELECT categoryimage FROM categories WHERE categoryname = '${categoryname}'`)).rows[0].categoryimage;

    const path = `public/images/${categoryImage}`;

    fs.unlink(path, err => {
        if (err) throw err;
        console.log(`${categoryImage} was deleted`);
    });

    const groceryImages = (await pool.query(`SELECT groceryimage FROM groceries WHERE categoryid = 
        (SELECT id FROM categories WHERE categoryname = '${categoryname}');`)).rows;

    groceryImages.forEach((item) => {
        let groceryPath = `public/images/${item.groceryimage}`;
        console.log(item);
        fs.unlink(groceryPath, err => {
            if (err) throw err;
            console.log(`${item.groceryimage} was deleted`);
        });
    });

    const SQL = `
    DELETE FROM groceries WHERE categoryid =
        (SELECT id FROM categories WHERE categoryname = '${categoryname}');

    DELETE FROM categories WHERE categoryname = '${categoryname}';
    `;

    await pool.query(SQL);
}

async function deleteCompany(companyname) {
    companyname = companyname.replace("'", "''");

    const companyImage = (await pool.query(`SELECT companyimage FROM companies WHERE companyname = '${companyname}';`)).rows[0].companyimage;

    const path = `public/images/${companyImage}`;

    fs.unlink(path, err => {
        if (err) throw err;
        console.log(`${companyImage} was deleted`);
    });

    const groceryImages = (await pool.query(`SELECT groceryimage FROM groceries WHERE companyid = 
        (SELECT id FROM companies WHERE companyname = '${companyname}');`)).rows;

    groceryImages.forEach((item) => {
        let groceryPath = `public/images/${item.groceryimage}`;
        fs.unlink(groceryPath, err => {
            if (err) throw err;
            console.log(`${item.groceryimage} was deleted`);
        });
    });

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