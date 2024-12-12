const { Router } = require('express');
const companyController = require('../controllers/companyController');

const companyRouter = Router();

companyRouter.get('/', companyController.getAllCompanies);

companyRouter.get('/add-company', companyController.getAddCompany);
companyRouter.post('/add-company', companyController.postAddCompany);

module.exports = companyRouter;