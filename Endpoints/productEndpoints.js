const express = require("express");
const productrouter = express.Router();
const { products, getSingleProduct, filteredProducts, searchTheproducts} = require("../Controller/productController");

productrouter.get('/products', products);
productrouter.get('/products/:id', getSingleProduct);
productrouter.get('/dashboard', searchTheproducts);
productrouter.get('/filter', filteredProducts);

module.exports = productrouter;
