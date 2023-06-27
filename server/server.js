const mongoose = require('mongoose');
const express = require('express');
let User = require('./model/User.js')

const app = express();
app.use(express.json());

app.use(function(req, res, next){
    res.header ("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

mongoose.connect('mongodb+srv://tothzoltan8719:151Codecool151@cluster0.r4iei62.mongodb.net/').then(() => {
    console.log("Connection to the database have been successful!");
    app.listen(3001, () => {
        console.log("App is running at port: 3001");
    })
}).catch((err) => {
    console.log(err);
})



app.post('/api/data', (req, res) => {
    console.log(req.body)
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
  
  app.listen(3001, () => console.log('Server started on port 3001'));
