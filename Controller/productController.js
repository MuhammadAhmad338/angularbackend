const { collection, getDocs } = require("@firebase/firestore");
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

module.exports = products;