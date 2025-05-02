const { body } = require('express-validator');
// import { getAllCategories, getAllCompanies } from './db/querries.js';
const { getAllCategories, getAllCompanies } = require('./db/querries');

const alphaErr = 'must only contain letters';
const lengthErr = 'must be between 1-30 characters';
const ratingErr = 'must be between 0 and 5';
const priceErr = 'must be between $0 and $100000';
const ignore = { ignore: ' ' };
const length = { min: 1, max: 30};

const validateAddCategory = [
    body('categoryname').trim()
        .isAlpha('en-US', ignore).withMessage(`Category name ${alphaErr}`)
        .isLength(length).withMessage(`Category name ${lengthErr}`)
        .escape()
];

const validateAddCompany = [
    body('companyname').trim()
        .isAlpha('en-US', ignore).withMessage(`Company name ${alphaErr}`)
        .isLength(length).withMessage(`Company name ${lengthErr}`)
        .escape()
];

const validateAddItem = [
    body('groceryname').trim()
        .isAlpha('en-US', ignore).withMessage(`Grocery name ${alphaErr}`)
        .isLength(length).withMessage(`Grocery name ${lengthErr}`)
        .escape(),
    body('price').trim()
        .isFloat({ min: 0, max: 100000 }).withMessage(`Price ${priceErr}`)
        .escape(),
    body('rating').trim()
        .isFloat({ min: 0, max: 5 }).withMessage(`Rating ${ratingErr}`)
        .escape(),
    body('categoryname').trim()
        .custom(async value => {
            const categoryNames = (await getAllCategories()).map(x => x.categoryname);
            if (!categoryNames.includes(value)) {
                throw new Error('Category name is not in database');
            }
        }),
    body('companyname').trim()
        .custom(async value => {
            const companyNames = (await getAllCompanies()).map(x => x.companyname);
            if (!companyNames.includes(value)) {
                throw new Error('Company name is not in database');
            }
        })
];

module.exports = {
    validateAddCategory,
    validateAddCompany,
    validateAddItem,
}