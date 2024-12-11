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
    ('fresh-fruits'),
    ('fresh-fegetables'),
    ('dairy-and-eggs'),
    ('meat');

INSERT INTO companies (companyname)
VALUES
    ('fresh-foods-company'),
    ('farmers''-guild');

INSERT INTO groceries (groceryname, price, rating, categoryid, companyid)
VALUES
    ('apple', 0.39, 4, 1, 1),
    ('banana', 0.35, 4.5, 1, 1),
    ('potatoes', 3.97, 4.4, 2, 1),
    ('broccoli', 3.97, 4.4, 2, 1),
    ('milk', 5.55, 4.3, 3, 2),
    ('ground beef', 8.48, 4, 4, 2),
    ('salmon', 11.07, 4, 4, 2);
`;

const resetTables = `
DROP TABLE groceries;

DROP TABLE categories;

DROP TABLE companies;
`;

// fix groceries name
const getAllGroceries = `
SELECT groceries.id, groceryName, price, rating, categoryname, companyname
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