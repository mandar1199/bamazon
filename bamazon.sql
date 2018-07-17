DROP DATABASE bamazon_db;
CREATE DATABASE Bamazondb;
USE Bamazondb;

CREATE TABLE products (
	id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(10,2),
    stock_quantity INTEGER(10),
    PRIMARY KEY (id)
);

SELECT * FROM bamazondb.products;

INSERT INTO products 
	(id, product_name, department_name, price, stock_quantity)
VALUES 
	(1, "Exploding Kittens Card Game", "Toys & Games", 13.99, 105),
    (2, "Inflatable Pool 103x69x22", "Toys & Games", 25.75, 86),
    (3, "What do You Meme Card Game", "Toys & Games", 20.99, 229),
    (4, "LifeStraw Personal Water Filter", "Sports & Outdoors", 9.99, 402),
    (5, "Waterpik by Aquarius Water Flosser", "Health & Beauty", 39.99, 65),
    (6, "LifeAround2Angels Bath Bomb Gift Set 12", "Health & Beauty", 24.80, 20),
    (7, "Opal Nugget Ice Maker", "Appliances", 499.00, 51),
    (8, "Fitbit Small", "Health & Household", 89.95, 357),
    (9, "Instant Pot Duo Mini 3 Qt", "Home & Kitchen", 59.99, 199),
    (10, "Jurrasic Park 25th Anniversary Collection in 4k", "Movies & TV", 49.96, 13)