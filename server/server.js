require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
let User = require('./model/User.js')
const connectionString = process.env.MONGODB_CONNECTION_STRING;

const app = express();
app.use(express.json());

app.use(function(req, res, next){
    res.header ("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Headers", "GET, POST, PUT, PATCH, DELETE")
    next();
})


app.post('/api/user', (req, res) => {
    // console.log(req.body)
    const username = req.body.username;
    const password = req.body.password;
    const createdAt = Date.now();
    const user = new User({
      username,
      password,
      createdAt
    });
    user.save()
    .then(user => res.json(user))
    .catch(err => res.status(400).json({ success: false }));
});

app.get('/api/getAllUser',  (req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(error => res.status(400).json())
})

app.delete('/api/deleteUser/:id', (req, res) =>{
    User.findByIdAndDelete(req.params.id)
    .then(res.json({message:"User profil deleted succesfully!"}))
    .catch(error=> res.json({message: "Error"}))
})



mongoose.connect(connectionString).then(() => {
    console.log("Connection to the database have been successful!");
    app.listen(3001, () => {
        console.log("App is running at port: 3001");
    })
}).catch((err) => {
    console.log(err);
})