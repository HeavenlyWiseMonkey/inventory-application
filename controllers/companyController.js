const db = require('../db/querries');

async function getAllCompanies(req, res) {
    const companies = await db.getAllCompanies();
    res.render('companies', {
        companies: companies,
    });
}

module.exports = {
    getAllCompanies,
}