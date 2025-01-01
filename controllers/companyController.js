const db = require('../db/querries');

async function getAllCompanies(req, res) {
    const companies = await db.getAllCompanies();
    res.render('companies', {
        companies: companies,
    });
}

async function getAllCompanyGroceries(req, res) {
    const companyGroceries = await db.getCompanyGroceries(req.params.companyname);
    res.render('groceries', {
        group: req.params.companyname,
        groceries: companyGroceries,
        name: 'companies',
        thing: 'company',
        text: 'Company',
    });
}

async function getItem(req, res) {
    const item = (await db.getItem(req.params.item))[0];
    res.render('item', {
        companyname: req.params.companyname,
        link: `companies/${req.params.companyname}`,
        item: item,
    });
}

async function getAddCompany(req, res) {
    res.render('addCompany');
}

async function postAddCompany(req, res) {
    await db.postAddCompany(req.body.companyname, req.file.filename);
    res.redirect('/companies');
}

async function getAddItem(req, res) {
    const categories = await db.getAllCategories();
    const companies = await db.getAllCompanies();
    res.render('addItem', {
        categories: categories,
        companies: companies,
        selectValue: req.params.companyname,
        link: `companies/${req.params.companyname}`,
    });
}

async function postAddItem(req, res) {
    const { groceryname, price, rating, categoryname, companyname } = req.body;
    await db.postAddItem(groceryname, price, rating, categoryname, companyname, req.file.filename);
    res.redirect(`/companies/${req.params.companyname}`);
}

async function getDeleteItem(req, res) {
    res.render('deleteItem', {
        groceryname: req.params.item,
    });
}

async function deleteItem(req, res) {
    await db.deleteItem(req.body.item);
    res.redirect(`/companies/${req.params.companyname}`);
}

async function getDeleteCompany(req, res) {
    res.render('deleteCompany', {
        companyname: req.params.companyname,
        link: `companies/${req.params.companyname}`,
    });
}

async function deleteCompany(req, res) {
    await db.deleteCompany(req.body.companyname);
    res.redirect('/companies');
}

module.exports = {
    getAllCompanies,
    getAllCompanyGroceries,
    getItem,
    getAddCompany,
    postAddCompany,
    getAddItem,
    postAddItem,
    getDeleteItem,
    deleteItem,
    getDeleteCompany,
    deleteCompany,
};