const express = require("express");
const productrouter = express.Router();
const { products, getSingleProduct, searchTheproducts} = require("../Controller/productController");

productrouter.get('/products', products);
productrouter.get('/products/:id', getSingleProduct);
productrouter.get('/dashboard', searchTheproducts);

module.exports = productrouter;
