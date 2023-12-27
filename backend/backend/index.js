const express = require('express');
const cors = require('cors');
require('./db/config');  // imported db connect function
const User = require('./db/User.js');
const Product = require('./db/product.js');

const JWt = require('jsonwebtoken');
const jwtkey = 'E-com123';

const app = express();

// with out using this we can't access requst data
app.use(express.json());  // it's function & most important for api
app.use(cors());

app.post('/register', async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password; // don't show password in response (Security) thats why deleted password befor send response.

    // sending json token
    JWt.sign({result},jwtkey,{expiresIn:"2h"},(error,token)=>{
        if(error){
            resp.send("Somthing is wrong try after some time");
        }else{
        resp.send({result, auth:token});
      }
    } 
    )
})

app.post('/login', async (req, resp) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password'); //selected -password not showing in response
        if (user) {
            JWt.sign({user},jwtkey,{expiresIn:"2h"},(error,token)=>{
                if(error){
                    resp.send({result:"Somthing is wrong try after some time"});
                }else{
                resp.send({user, auth:token});
              }
            } 
            )

        } else {  // If user not found in data base response below
            resp.send({result :"No user found or not valid email & password"})
        }
    } else {
        resp.status(404).send({result :"Please Enter user & password"})
    }
});


// add product
app.post('/addproduct', verifytoken, async (req, resp) => {
    let product =  Product(req.body);
    let result = await product.save();
    resp.send(result);
})

//Product List
app.get('/products', verifytoken, async (req, resp) => {

    let products = await Product.find();

    if (products.length > 0) {
        resp.send(products);
    } else {
        resp.send({ result: "Product Not Found" });
    }
})

//delete product
app.delete('/product/:id', verifytoken, async (req, resp) => {


    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
})

// get single product details for update
app.get('/product/:id' ,verifytoken,async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send("No record found");
    }
})

// update product
app.put('/product/:id' ,verifytoken,async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },  // which bases on update data

        {   // set new data 
            $set: req.body
        });
    resp.send(result);
})


// search product with case insensitive
app.get('/search/:key',verifytoken, async (req, resp) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key, $options: 'i'  } },
            { company: { $regex: req.params.key, $options: 'i'} },
            { category: { $regex: req.params.key, $options: 'i' } }
        ]
    })
    resp.send(result);
})



// verify JWT Token
function verifytoken(req,resp,next){
    //                   use [ ] & a is lower letter mandatory
    let token = req.headers["authorization"];

    if(token){                              // 0       1
// convert in array base on space ' '   e.x : bearer eyJhbGciOi
        token = token.split(' ')[1];
        JWt.verify(token,jwtkey,(error,succsse)=>{
            if(error){
                resp.status(401).send({ result : "Please Provide Valid Token " })
            }else{
                next();
            }
        })

    }else{
        resp.status(403).send({ result : "please Provide token in header "} )
    }
};



app.listen(5000, () => {
    console.log("open")
})





