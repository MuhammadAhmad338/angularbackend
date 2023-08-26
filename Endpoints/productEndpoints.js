const express = require("express");
const productrouter = express.Router();
const { products, getSingleProduct, filteredProducts, searchTheproducts, addProduct} = require("../Controller/productController");

productrouter.get('/products', products);
productrouter.get('/products/:id', getSingleProduct);
productrouter.get('/dashboard', searchTheproducts);
productrouter.get('/filter', filteredProducts);
productrouter.post('/addProduct', addProduct);

module.exports = productrouter;
