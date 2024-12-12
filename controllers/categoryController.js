const db = require('../db/querries');

async function getAllCategories(req, res) {
    const categories = await db.getAllCategories();
    res.render('categories', {
        categories: categories
    });
}

async function getAllCategoryGroceries(req, res) {
    const categoryGroceries = await db.getCategoryGroceries(req.params.category);
    res.render('groceries', {
        category: req.params.category,
        groceries: categoryGroceries,
    })
}

async function getItem(req, res) {
    const item = await db.getItem(req.params.item);
    res.render('item', {
        category: req.params.category,
        item: req.params.item,
    })
}

function getAddCategory(req, res) {
    res.render('addCategory');
}

async function postAddCategory(req, res) {
    await db.postAddCategory(req.body.categoryname);
    res.redirect('/');
}

async function getAddItem(req, res) {
    const companies = await db.getAllCompanies();
    res.render('addItem', {
        companies: companies,
    });
}

async function postAddItem(req, res) {
    const { groceryname, price, rating, companyname } = req.body;
    await db.postAddItem(groceryname, price, rating, req.params.category, companyname);
    res.redirect('/');
}

module.exports = {
    getAllCategories,
    getAllCategoryGroceries,
    getItem,
    getAddCategory,
    postAddCategory,
    getAddItem,
    postAddItem,
}