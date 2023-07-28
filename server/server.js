require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
let User = require("./model/User.js");
const bcrypt = require("bcrypt");
const connectionString = process.env.MONGODB_CONNECTION_STRING;
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
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

//  app.post('/api/user', (req, res) => {
//      const { username, password, playerScore } = req.body;
//      const createdAt = Date.now();
//      bcrypt.hash(password, 10, (err, hash) => {
//          if (err) {
//              return res.status(500).json({ success: false, message: "Error occurred during password hashing." });
//          }
//          const user = new User({
//              username,
//              password: hash,
//              playerScore,
//              createdAt
//          });
//          user.save()
//              .then(user => res.json(user))
//              .catch(err => res.status(400).json({ success: false, message: "Error occurred while saving user." }));
//      });
//  });

app.post('/api/user', async (req, res) => {
  const { username, password, playerScore } = req.body;
  const createdAt = Date.now();

  try {
      const hash = await bcrypt.hash(password, 10);

      const user = new User({
          username,
          password: hash,
          playerScore,
          createdAt,
      });
      const savedUser = await user.save();
      return res.json(savedUser);
  } catch (err) {
      return res.status(400).json({ success: false, message: "Error occurred while saving user.", error: err.message });
  }
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

app.get("/api/playerScore", (req, res) => {
  User.find()
    .then((users) => {
      const results = users.map(user => ({
        username: user.username,
        playerScore: user.playerScore,
      }));
      res.json(results);
    })
    .catch((error) => res.status(500).json({ error: error.toString() }));
});

app.get("/api/playerScore/:id", async (req, res) => {
  try{
    const user = await User.findById(req.params.id);
    return res.json({username:user.username, playerScore:user.playerScore})
  } catch (error) {
    res.status(500).json({ error: "Something went wrong."});
  }
});

app.put("/api/playerScore/:id", async (req, res) => {
  try{
    const user = await User.findById(req.params.id);

    if(req.body.playerScore && req.body.playerScore.length > 0 && typeof req.body.playerScore[0].score === "number") {
        user.playerScore.push({score: req.body.playerScore[0].score});
        await user.save();
        return res.json(user);
    } else {
        res.status(400).json({ error: "Incorrect score data."});
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong."});
  }
});

app.get('/api/leaderboard', async (req, res) => {
  let result = await User.aggregate([
      { $unwind: '$playerScore' },
      {
          $group: {
              _id: '$username', // group by username
              highestScore: { 
                  $max: '$playerScore.score' // access playerScore.score to find max for each user
              }
          }
      },
      { 
          $sort: { highestScore: -1 }  // sort the grouped result in descending order 
      },
      { 
          $limit: 10  // limit to 10 results
      }
  ]);
  res.send(result); // return the top 10 users with highest individual score
});




mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000
    }
  })  
  .then(() => {
    console.log("Connection to the database have been successful!");
    app.listen(3001, () => {
      console.log("App is running at port: 3001");
    });
  })
  .catch((err) => {
    console.log(err);
  });
