const db = require('../db/querries');

async function getAllCompanies(req, res) {
    const companies = await db.getAllCompanies();
    res.render('companies', {
        companies: companies,
    });
}

async function getAllCompanyItems(req, res) {
    
}

async function getAddCompany(req, res) {
    res.render('addCompany');
}

async function postAddCompany(req, res) {
    await db.postAddCompany(req.body.companyname);
    res.redirect('/');
}

module.exports = {
    getAllCompanies,
    getAddCompany,
    postAddCompany,
};