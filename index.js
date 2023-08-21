const express = require('express');
// Import the functions you need from the SDKs you need
const router = require('./Endpoints/endpoints.js');
const authrouter = require('./Endpoints/authEndpoints.js');
const productrouter = require('./Endpoints/productEndpoints.js');
const cors = require('cors');
const app = express();

const port = 8080;
app.use(express.json());
app.use(cors());

app.use("/", router);
app.use("/", authrouter);
app.use("/", productrouter);

app.listen(port, () => {
    console.log(`Server is listening at this port ${port}`)
});
