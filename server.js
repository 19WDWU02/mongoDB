/*
    In package.json make sure to include this in the scripts
    "start": "node server"

    Also include this at the end of the package.json
    "engines": {
        "node": "10.8.0"
    }

*/

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Remove or comment out this line bellow
// const config = require('./config.json');

const Product = require('./models/products');
const User = require('./models/users');

// Include this line rather than the one bellow
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function(){
    console.log('Server is running on port '+ app.get('port'));
})

//Change the variables from the config to the process
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_NAME}.mongodb.net/shop?retryWrites=true&w=majority`, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected to mongo db');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());

app.use(function(req, res, next){
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/', function(req, res){
    res.send('Welcome to our Products API. Use endpoints to filter out the data');
});

app.post('/product', function(req, res){
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        user_id: req.body.userId
    });

    product.save().then(result => {
        res.send(result);
    }).catch(err => res.send(err));
});

app.get('/allProducts', function(req, res){
    Product.find().then(result => {
        res.send(result);
    })
})

app.post('/product/:id', function(req, res){
    const id = req.params.id;
    Product.findById(id, function (err, product) {
        if(product['user_id'] == req.body.userId){
            res.send(product);
        } else {
            res.send('401');
        }
    });
});

app.patch('/product/:id', function(req, res){
    const id = req.params.id;
    Product.findById(id, function(err, product){
        if(product['user_id'] == req.body.userId){
            const newProduct = {
                name: req.body.name,
                price: req.body.price
            };
            Product.updateOne({ _id : id }, newProduct).then(result => {
                res.send(result);
            }).catch(err => res.send(err));
        } else {
            res.send('401');
        }
    }).catch(err => res.send('cannot find product with that id'));
})

app.delete('/product/:id', function(req, res){
    const id = req.params.id;
    Product.findById(id, function(err, product){
        if(product['user_id'] == req.body.userId){
            Product.deleteOne({ _id: id }, function (err) {
                res.send('deleted');
            });
        } else {
            res.send('401');
        }
    }).catch(err => res.send('cannot find product with that id'));

});

app.post('/users', function(req, res){
    User.findOne({ username: req.body.username }, function (err, checkUser) {
        if(checkUser){
            res.send('user already exists');
        } else {
            const hash = bcrypt.hashSync(req.body.password);
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            user.save().then(result => {
                res.send(result);
            }).catch(err => res.send(err));
        }
    });
})

app.post('/getUser', function(req, res){
    User.findOne({ username: req.body.username }, function (err, checkUser) {;
        if(checkUser){
            if(bcrypt.compareSync(req.body.password, checkUser.password)){
                res.send(checkUser);
            } else {
                res.send('invalid password');
            }
        } else {
            res.send('invalid user');
        }
    });

})
