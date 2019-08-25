const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

/* Broken on Yoobee Wifi */

// const mongoose = require('mongoose');

// const config = require('./config.json');
//
// mongoose.connect(`mongodb+srv://${config.mongoDBUser}:${config.mongoDBPassword}@simonscluster-yyrov.mongodb.net/shop?retryWrites=true&w=majority`, {useNewUrlParser: true});
//
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', ()=> {
//     // we're connected!
//     console.log('conected');
// });

/* Borken ends */

const allProducts = require('./data/products');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

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

/* Broken at yoobee wifi */

// const Product = requre('./models/product');
// const Contact = requre('./models/contact');

/* Broken stops */

app.post('/product/add', (req, res)=> {

    /* Broken at yoobee wifi */

    // const product = new Product({
    //     _id: new mongoose.Types.ObjectId(),
    //     name: req.body.name,
    //     price: req.body.price
    // });
    //
    // product.save().then((result)=> {
    //     res.send(result);
    // }).catch((err)=> {
    //     res.send(err);
    // });

    /* Broken stops */

    const newName = req.body.name;
    const newPrice = parseFloat(req.body.price);

    let newId = allProducts[allProducts.length - 1].id + 1;
    let newData = {
        id: newId,
        name: newName,
        price: newPrice
    }
    allProducts.push(newData);
    let newDataString = JSON.stringify(allProducts);
    fs.writeFileSync('data/products.json', newDataString);
    res.send('Product Added');
});

app.post('/contact', (req, res)=> {
    /* Broken at yoobee wifi */

    const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.price,
        message: req.body.message
    });

    contact.save().then((result)=> {
        res.send(result);
    }).catch((err)=> {
        res.send(err);
    });

    /* Broken stops */
});

app.post('/user/add', (req, res)=> {
    let username = req.body.username;
    let password = req.body.password;
    let age = req.body.age;
    let favColor = req.body.favColor;

    /* Add user to the database */

    // res.send(newUser);
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
        fs.writeFileSync('data/products.json', newDataString);
        res.send('Product edited');
    } else {
        res.send('No product was found');
    }
});

app.listen(port, () => {
    console.log(`application is running on port ${port}`);
});
