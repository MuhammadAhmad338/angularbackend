const { collection, getDocs, query, where } = require("@firebase/firestore");
const { firestore } = require("./controller");

const products = async (req, res) => {
    try {
     const myCollection = collection(firestore, 'products');
     const myDocs = await getDocs(myCollection);
     const products = myDocs.docs.map(doc => doc.data());
     res.status(200).json(products);
    } catch(error) {
        console.log(error);
    }
}

const getSingleProduct = async (req, res) => {
    const name = req.params.id;
    console.log(name);
    let data;
    try {
        const myCollection = collection(firestore, 'products');
        const result = query(myCollection, where('name', '==', `${name}`));
        const querySnapshot = await getDocs(result);
        querySnapshot.forEach(doc => data = doc.data());
        res.status(200).json(data); 
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {products, getSingleProduct};