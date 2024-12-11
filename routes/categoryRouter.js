const { Router } = require('express');
const categoryController = require('../controllers/categoryController');

const categoryRouter = Router();

categoryRouter.get('/', categoryController.getAllCategories);

categoryRouter.get('/:category', categoryController.getAllCategoryGroceries);

categoryRouter.get('/:category/:item', categoryController.getItem);

module.exports = categoryRouter;