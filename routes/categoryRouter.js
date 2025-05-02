const { Router } = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
    },

    filename: function(req, file, cb) {
        const accepted = ['image/png', 'image/jpg', 'image/jpeg'];
        const fileparts = file.originalname.split('.');

        if (!accepted.includes(file.mimetype)) {
            return cb(new Error('Only images (PNG, JPG) are allowed'));
        }

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, fileparts[0] + '-' + uniqueSuffix + '.' + fileparts[1]);
    },
});

const upload = multer({ storage: storage });

const categoryController = require('../controllers/categoryController');

const categoryRouter = Router();

categoryRouter.get('/', categoryController.getAllCategories);

categoryRouter.get('/add-category', categoryController.getAddCategory);
categoryRouter.post('/add-category', upload.single('image'), categoryController.postAddCategory);

categoryRouter.get('/:categoryname/delete-category', categoryController.getDeleteCategory);
categoryRouter.post('/:categoryname/delete-category', categoryController.deleteCategory);

categoryRouter.get('/:categoryname/add-item', categoryController.getAddItem);
categoryRouter.post('/:categoryname/add-item', upload.single('image'), categoryController.postAddItem);

categoryRouter.get('/:categoryname/:item/delete-item', categoryController.getDeleteItem);
categoryRouter.post('/:categoryname/:item/delete-item', categoryController.deleteItem);

categoryRouter.get('/:categoryname/:item', categoryController.getItem);

categoryRouter.get('/:categoryname', categoryController.getAllCategoryGroceries);

module.exports = categoryRouter;