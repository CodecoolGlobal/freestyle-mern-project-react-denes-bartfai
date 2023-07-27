require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
let User = require("./model/User.js");
const bcrypt = require("bcrypt");
const connectionString = process.env.MONGODB_CONNECTION_STRING;

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  next();
});

/*app.post("/api/user", (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  const createdAt = Date.now();

  const user = new User({
    username,
    password,
    createdAt,
  });
  user
    .save()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ success: false }));
});*/

 app.post('/api/user', (req, res) => {
     const { username, password } = req.body;
     const createdAt = Date.now();
     bcrypt.hash(password, 10, (err, hash) => {
         if (err) {
             return res.status(500).json({ success: false, message: "Error occurred during password hashing." });
         }
         const user = new User({
             username,
             password: hash,
             createdAt
         });
         user.save()
             .then(user => res.json(user))
             .catch(err => res.status(400).json({ success: false, message: "Error occurred while saving user." }));
     });
 });

app.get("/api/getAllUser", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((error) => res.status(400).json());
});

app.delete("/api/deleteUser/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(res.json({ message: "User profil deleted succesfully!" }))
    .catch((error) => res.json({ message: "Error" }));
});

app.get("/api/findUser/:username", async (req, res) => {
  try {
    let data = await User.findOne({ username: req.params.username });
    if (data !== null) {
      res.json([true, data]);
    } else {
      res.json([false, { message: "User not found" }]);
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Some error occured" }).status(500);
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username })
      .then(user => {
          if (!user) {
              return res.status(404).json({ message: "User not found." });
          }
          bcrypt.compare(password, user.password, (err, result) => {
              if (err) {
                  return res.status(500).json({message: "Error occurred during password comparison." });
              }
              if (result) {
                  res.json([true, user]);
              } else {
                  res.status(401).json({message: "Invalid password." });
              }
          });
      })
      .catch(err => res.status(500).json({ success: false, message: "Error occurred during login." }));
});
app.get("api/findUserByIp/:id", async (req,res) => {
  try {
    let data = await User.findById(req.params.id);
    if (data !== null) {
      res.json([true, data]);
    } else {
      res.json([false, { message: "User not found" }]);
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Some error occured" }).status(500);
  }
})


mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connection to the database have been successful!");
    app.listen(3001, () => {
      console.log("App is running at port: 3001");
    });
  })
  .catch((err) => {
    console.log(err);
  });
