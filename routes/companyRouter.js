const { Router } = require('express');
const companyController = require('../controllers/companyController');

const companyRouter = Router();

companyRouter.get('/', companyController.getAllCompanies);

companyRouter.get('/add-company', companyController.getAddCompany);
companyRouter.post('/add-company', companyController.postAddCompany);

companyRouter.get('/:companyname/delete-company', companyController.getDeleteCompany);
companyRouter.post('/:companyname/delete-company', companyController.deleteCompany);

companyRouter.get('/:companyname/add-item', companyController.getAddItem);
companyRouter.post('/:companyname/add-item', companyController.postAddItem);

companyRouter.get('/:companyname/:item/delete-item', companyController.getDeleteItem);
companyRouter.post('/:companyname/:item/delete-item', companyController.deleteItem);

companyRouter.get('/:companyname/:item', companyController.getItem);
companyRouter.get('/:companyname', companyController.getAllCompanyGroceries);

module.exports = companyRouter;