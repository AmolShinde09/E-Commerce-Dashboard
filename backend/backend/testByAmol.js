const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/ABCD')
.then(()=>{ console.log("Hello")})
.catch((error)=>{console.log(error)})

