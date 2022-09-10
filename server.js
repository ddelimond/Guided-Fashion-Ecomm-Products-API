const http = require('http');
const fs = require('fs');
const figlet = require('figlet');
const path = require('path');
let products = require('./products');
let PORT = process.env.PORT || 8000
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    let message = {
        message: "Route Not Found: Please use the api/products endpoint"
    }

    res.json(message)
})

app.get('/api/products', (req, res) => {
    return res.json(products)
})

app.get('/api/:id', (req, res) => {

    let singleProduct = products.products.filter(obj => obj.id === req.params.id)

    if (singleProduct.length !== 0) {
        return res.json(singleProduct);
    }
    else {
        figlet('No Such Product Exists', function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            res.end(data)
        });
    }
})


const server = app.listen(PORT, (res, req) => {
    console.log(`server is listening on port ${PORT}`)
})