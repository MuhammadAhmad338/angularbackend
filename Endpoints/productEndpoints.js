const express = require("express");
const productrouter = express.Router();
const products = require("../Controller/productController");

productrouter.get('/products', products);

module.exports = productrouter;
