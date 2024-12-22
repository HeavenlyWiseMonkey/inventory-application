require('dotenv').config();
const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS groceries (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    groceryname VARCHAR ( 255 ),
    price FLOAT,
    rating FLOAT,
    categoryid INTEGER,
    companyid INTEGER,
    grocerypath VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    categoryname VARCHAR ( 255 ),
    categorypath VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS companies (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    companyname VARCHAR ( 255 ),
    companypath VARCHAR ( 255 )
);

INSERT INTO categories (categoryname, categorypath)
VALUES
    ('Fresh fruits', 'banana.jpg'),
    ('Fresh vegetables', 'potato.jpeg'),
    ('Dairy and eggs', 'milk.jpg'),
    ('Meat', 'ground-beef.png'),
    ('Juice', 'orange-juice.png'),
    ('Berries', 'blueberries.png');

INSERT INTO companies (companyname, companypath)
VALUES
    ('Fresh Foods Company', 'fresh-foods-company.jpeg'),
    ('Farmers'' Guild', 'farmers-guild.jpg');

INSERT INTO groceries (groceryname, price, rating, categoryid, companyid, grocerypath)
VALUES
    ('Apple', 0.39, 4, 1, 1, 'apple.jpg'),
    ('Banana', 0.35, 4.5, 1, 1, 'banana.jpg'),
    ('Potato', 3.97, 4.5, 2, 1, 'potato.jpeg'),
    ('Broccoli', 3.97, 4.5, 2, 1, 'broccoli.jpg'),
    ('Milk', 5.55, 4.5, 3, 2, 'milk.jpg'),
    ('Ground beef', 8.48, 4, 4, 2, 'ground-beef.png'),
    ('Salmon', 11.07, 4, 4, 2, 'salmon.jpg'),
    ('Orange juice', 1.48, 4.5, 5, 1, 'orange-juice.png'),
    ('Blueberries', 4.97, 4, 6, 2, 'blueberries.png');
`;

const resetTables = `
DROP TABLE groceries;

DROP TABLE categories;

DROP TABLE companies;
`;

const getAllGroceries = `
SELECT groceries.id, groceryname, price, rating, categoryname, companyname, grocerypath
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