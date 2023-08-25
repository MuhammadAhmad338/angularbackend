const { collection, getDocs, query, where, getDoc } = require("@firebase/firestore");
const uuid = require("uuid");
const { firestore } = require("./controller");

const products = async (req, res) => {
    try {
     const myCollection = collection(firestore, 'products');
     const myDocs = await getDocs(myCollection);
     const products = myDocs.docs.map(doc => doc.data());
     res.status(200).json(products);
    } catch(error) {
        res.status(500).json(error);
    }
}

const getSingleProduct = async (req, res) => {
    const productId = req.params.id; 
    const integerProductId = parseInt(productId);
    const resultData = []; // Create an array to store the data
    try {
        const myCollection = collection(firestore, 'products');
        const result = query(myCollection, where('id', '==', integerProductId)); // Create a query
        const querySnapshot = await getDocs(result); // Execute the query and get a snapshot
        querySnapshot.forEach(doc => {
            resultData.push(doc.data()); // Push each document's data to the array
        });
        res.status(200).json(resultData); // Send the array of data in the response
    } catch(error) {
        res.status(500).json(error);
    }
}

const searchTheproducts = async (req, res) => {
    const { search } = req.query;
    let data = [];
    try {
        const gotCollection = collection(firestore, 'products');
        const result = query(gotCollection, where('name', '==', `${search}`));
        const querySnapshot = await getDocs(result);
        querySnapshot.forEach(doc => data.push(doc.data()));
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json(error);
    }
}

const filteredProducts = async (req, res) => {
    const { name } = req.body; 
    let data = [];
    try {
        const gotCollection = collection(firestore, 'products');
        const result = query(gotCollection, where('name', '==', `${name}`));
        const querySnapshot = await getDocs(result);
        querySnapshot.forEach(doc => doc.data());
        res.status(200).json(data);
    } catch(error) {
        res.status(200).json(error);
    }
}

module.exports = {products, getSingleProduct, searchTheproducts, filteredProducts};