const db = require('../db/querries');

async function getAllCategories(req, res) {
    const categories = await db.getAllCategories();
    res.render('categories', {
        categories: categories
    });
}

async function getAllCategoryGroceries(req, res) {
    const categoryGroceries = await db.getCategoryGroceries(req.params.categoryname);
    res.render('groceries', {
        group: req.params.categoryname,
        groceries: categoryGroceries,
        name: 'categories',
        thing: 'category',
        text: 'Category',
    });
}

async function getItem(req, res) {
    const item = (await db.getItem(req.params.item))[0];
    res.render('item', {
        categoryname: req.params.categoryname,
        link: `categories/${req.params.categoryname}`,
        item: item,
    });
}

function getAddCategory(req, res) {
    res.render('addCategory');
}

async function postAddCategory(req, res) {
    await db.postAddCategory(req.body.categoryname, req.file.filename);
    res.redirect('/categories');
}

async function getAddItem(req, res) {
    const categories = await db.getAllCategories();
    const companies = await db.getAllCompanies();
    res.render('addItem', {
        categories: categories,
        companies: companies,
        selectValue: req.params.categoryname,
        link: `categories/${req.params.categoryname}`,
    });
}

async function postAddItem(req, res) {
    const { groceryname, price, rating, categoryname, companyname } = req.body;
    await db.postAddItem(groceryname, price, rating, categoryname, companyname, req.file.filename);
    res.redirect(`/categories/${req.params.categoryname}`);
}

async function getDeleteItem(req, res) {
    res.render('deleteItem', {
        groceryname: req.params.item,
    });
}

async function deleteItem(req, res) {
    await db.deleteItem(req.body.item);
    res.redirect(`/categories/${req.params.categoryname}`);
}

async function getDeleteCategory(req, res) {
    res.render('deleteCategory', {
        categoryname: req.params.categoryname,
        link: `categories/${req.params.categoryname}`,
    });
}

async function deleteCategory(req, res) {
    await db.deleteCategory(req.body.categoryname);
    res.redirect('/categories');
}

module.exports = {
    getAllCategories,
    getAllCategoryGroceries,
    getItem,
    getAddCategory,
    postAddCategory,
    getAddItem,
    postAddItem,
    getDeleteItem,
    deleteItem,
    getDeleteCategory,
    deleteCategory,
};