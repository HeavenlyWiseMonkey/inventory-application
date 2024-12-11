const db = require('../db/querries');

function getIndex(req, res) {
    res.render('index');
}

module.exports = {
    getIndex,
}