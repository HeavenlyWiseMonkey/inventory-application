const { Router } = require('express');
const categoryController = require('../controllers/categoryController');

const categoryRouter = Router();

categoryRouter.get('/', categoryController.getAllCategories);

categoryRouter.get('/add-category', categoryController.getAddCategory);
categoryRouter.post('/add-category', categoryController.postAddCategory);

categoryRouter.get('/:categoryname/add-item', categoryController.getAddItem);
categoryRouter.post('/:categoryname/add-item', categoryController.postAddItem);

categoryRouter.get('/:categoryname/:item', categoryController.getItem);
categoryRouter.get('/:categoryname', categoryController.getAllCategoryGroceries);

module.exports = categoryRouter;