const { Router } = require('express');
const companyController = require('../controllers/companyController');

const companyRouter = Router();

companyRouter.get('/', companyController.getAllCompanies);

module.exports = companyRouter;