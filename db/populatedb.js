require('dotenv').config();
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS groceries (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    groceryname VARCHAR ( 255 ),
    price FLOAT,
    rating FLOAT,
    categoryid INTEGER,
    companyid INTEGER
);

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    categoryname VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS companies (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    companyname VARCHAR ( 255 )
);

INSERT INTO categories (categoryname)
VALUES
    ('Fresh fruits'),
    ('Fresh vegetables'),
    ('Dairy and eggs'),
    ('Meat'),
    ('Juice'),
    ('Berries');

INSERT INTO companies (companyname)
VALUES
    ('Fresh Foods Company'),
    ('Farmers'' Guild');

INSERT INTO groceries (groceryname, price, rating, categoryid, companyid)
VALUES
    ('Apple', 0.39, 4, 1, 1),
    ('Banana', 0.35, 4.5, 1, 1),
    ('Potatoes', 3.97, 4.5, 2, 1),
    ('Broccoli', 3.97, 4.5, 2, 1),
    ('Milk', 5.55, 4.5, 3, 2),
    ('Ground beef', 8.48, 4, 4, 2),
    ('Salmon', 11.07, 4, 4, 2),
    ('Orange juice', 1.48, 4.5, 5, 1),
    ('Blueberries', 4.97, 4, 6, 2);
`;

const resetTables = `
DROP TABLE groceries;

DROP TABLE categories;

DROP TABLE companies;
`;

const getAllGroceries = `
SELECT groceries.id, groceryname, price, rating, categoryname, companyname
FROM ((groceries
    INNER JOIN categories ON groceries.categoryId = categories.id)
    INNER JOIN companies ON groceries.companyId = companies.id);
`;

async function main() {
    console.log('seeding...');
    const client = new Client({
        connectionString: process.env.CONNECTION_STRING,
    });
    await client.connect();
    await client.query(resetTables);
    await client.query(SQL);
    const { rows } = await client.query(getAllGroceries);
    console.log(rows);
    await client.end();
    console.log('done');
}

main();