
const express = require('express');


const port = 4000;
const app = express();
const Scrapping = require("./scrapping");
// const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Product = require('./models/product');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://0.0.0.0:27017/testDatabase");

app.set('view engine', 'ejs');
app.use(express.json())
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));



 

app.get('/scrapping', (req, res) => {
    res.send("scrapping.js");
});


app.listen(port, () => console.log('Example app listening on port ' + port));

