const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Friend = require('./models/friends.model');
mongoose.connect("mongodb://localhost/friends", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Connect to the database successfully!");
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    Friend.find({})
    .exec((err,friends)=>{
        if(err){
            throw err;
        }else{
            res.render('friends',{friends:friends})
        }
    })    
});

PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
