const { Router } = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
    },

    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileparts = file.originalname.split('.');
        cb(null, fileparts[0] + '-' + uniqueSuffix + '.' + fileparts[1]);
    }
});

const upload = multer({ storage: storage });

const companyController = require('../controllers/companyController');

const companyRouter = Router();

companyRouter.get('/', companyController.getAllCompanies);

companyRouter.get('/add-company', companyController.getAddCompany);
companyRouter.post('/add-company', upload.single('image'), companyController.postAddCompany);

companyRouter.get('/:companyname/delete-company', companyController.getDeleteCompany);
companyRouter.post('/:companyname/delete-company', companyController.deleteCompany);

companyRouter.get('/:companyname/add-item', companyController.getAddItem);
companyRouter.post('/:companyname/add-item', upload.single('image'), companyController.postAddItem);

companyRouter.get('/:companyname/:item/delete-item', companyController.getDeleteItem);
companyRouter.post('/:companyname/:item/delete-item', companyController.deleteItem);

companyRouter.get('/:companyname/:item', companyController.getItem);
companyRouter.get('/:companyname', companyController.getAllCompanyGroceries);

module.exports = companyRouter;