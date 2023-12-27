const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/EcommDashboard")
.then(()=> console.log("conection successfull.."))   
.catch((error)=> console.log(error));  
