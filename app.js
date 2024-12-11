require('dotenv').config();
const express = require('express');
const app = express();
const path = require('node:path');
const indexRouter = require('./routes/indexRouter');
const categoryRouter = require('./routes/categoryRouter');
const companyRouter = require('./routes/companyRouter');

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/categories', categoryRouter);
app.use('/companies', companyRouter);

const PORT = 3000;
app.listen(PORT, (req, res) => {
    console.log(`Server running at port ${PORT}`);
})