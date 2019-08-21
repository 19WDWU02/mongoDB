const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

const allProducts = require('./data/products');

app.use((req, res, next)=> {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/', (req, res)=> {
    res.send('Welcome to our Products API. Use endpoints to filter out the data');
});

app.get('/all', (req, res)=> {
    res.send(allProducts);
});

app.get('/product/id=:id', (req, res)=> {
    const id = req.params.id;
    let check = false;
    allProducts.map((product)=> {
        if (product.id == id) {
            check = true;
            res.send(product);
        }
    });
    if (!check) {
        res.send('Product not found');
    }
});

app.get('/product/delete/id=:id', (req, res)=> {
    const id = req.params.id;
    let newData = [];
    allProducts.map((product)=> {
        if (product.id != id) {
            newData.push(product);
        }
    });
    if (newData.length >= 1) {
        let newDataString = JSON.stringify(newData);
        fs.writeFileSync('data/products.json', newDataString);
        res.send('Product deleted');
    } else {
        res.send('Product not found');
    }
});

app.get('/product/edit/id=:id&name=:name&price=:price', (req, res)=> {
    let newData = [];
    let check = false;
    allproducts.map((product)=> {
        if (req.params.id == product.id) {
            if ((req.params.name != product.name) && (req.params.price != product.price)) {
                check = true;
                let temData = {
                    id: product.id,
                    name: req.params.name,
                    price: req.params.price
                }
                newData.push(temData);
            }
        } else {
            newData.push(product);
        }
    });
    if (check) {
        let newDataString = JSON.stringify(newData);
        fs.writeFileSync('data/products2.json', newDataString);
        res.send('Product edited');
    } else {
        res.send('No product was found');
    }
});

app.listen(port, () => {
    console.log(`application is running on port ${port}`);
});
