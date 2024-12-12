const { Router } = require('express');
const categoryController = require('../controllers/categoryController');

const categoryRouter = Router();

categoryRouter.get('/', categoryController.getAllCategories);

categoryRouter.get('/add-category', categoryController.getAddCategory);

categoryRouter.post('/add-category', categoryController.postAddCategory);

categoryRouter.get('/:category/add-item', categoryController.getAddItem);

categoryRouter.post('/:category/add-item', categoryController.postAddItem);

categoryRouter.get('/:category', categoryController.getAllCategoryGroceries);

categoryRouter.get('/:category/:item', categoryController.getItem);

module.exports = categoryRouter;