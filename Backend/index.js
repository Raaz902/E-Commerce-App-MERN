const express = require('express');
const cors = require('cors');
//const mongoose = require('mongoose');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');


const app = express();


/* const connectDB = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
    console.log('Connected');
    const productSchema = new mongoose.Schema({});
    const Product = mongoose.model('Product', productSchema);
    const data = await Product.find();

    console.log(data); 
}
connectDB(); */
app.use(express.json())
app.use(cors())

app.post('/register', async (req, res) => {
    let users = new User(req.body);
    let result = await users.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
})
app.post('/login', async (req, res) => {

    if (req.body.password && req.body.email) {
        const user = await User.findOne(req.body).select("-password");
        console.log(user)
        if (user) {
            res.send(user);
        } else {
            res.send(JSON.stringify({ "msg": "Enter correct details" }))
        }
    } else {
        res.send(JSON.stringify({ "msg": "Enter both details" }));
    }
})
app.post('/addproduct', async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get('/products', async (req, res) => {
    let products = await Product.find()
    console.log(products)
    //console.log(typeof products)
    if (products) {
        res.send(products)
    } else {
        res.send({ result: "No product found" })
    }
});

app.delete('/delete/:id', async (req, res) => {
    console.log(req.params.id)
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result.acknowledged)
});



app.put('/update/:id', async (req, res) => {
    const productId = req.params.id;
    const updateData = req.body;
    console.log(productId);
    // const product = await Product.findOne(req.body).select("-_id -__v");
    // console.log(product)

    const result = await Product.findOneAndUpdate(
        { _id: productId },
        { $set: updateData },
        { new: true } // To return the updated document
    );
    res.send(result)
});
app.get("/search/:key?", async (req, res) => {
    console.log(req.params.key);
    let result = req.params.key ? await Product.find({
        $or: [
            { name: { $regex: req.params.key, $options: 'i' } },
            { company: { $regex: req.params.key, $options: 'i' } },
            { category: { $regex: req.params.key, $options: 'i' } }
        ]
    }) : await Product.find();
    res.send(result)
})

app.get('/product_details/:id', async (req, res) => {
    let product = await Product.find({ _id: req.params.id })
    console.log(product)
    //console.log(typeof products)
    if (product) {
        res.send(product)
    } else {
        res.send({ result: "No product found" })
    }
});

app.get('/', (req, res) => {
    res.send("backend is ready..");
});
app.listen(8000, () => {
    console.log('Listening at port 8000');
});

