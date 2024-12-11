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

module.exports = {
    getAllCategories,
    getAllCategoryGroceries,
    getItem,
}