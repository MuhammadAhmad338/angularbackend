const express = require("express");
const productrouter = express.Router();
const { products, getSingleProduct} = require("../Controller/productController");

productrouter.get('/products', products);
productrouter.get('/products/:id', getSingleProduct);

module.exports = productrouter;
