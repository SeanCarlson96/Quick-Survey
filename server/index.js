const path = require('path');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://QSuser:QSpass@quicksurveycluster.o321mlo.mongodb.net/qsDB", {useNewUrlParser: true}, {useUnifiedTopology: true});

const surveyResponseSchema = {
  name: String,
  email: String,
  age: Number,
  hours: String,
  adInfluence: String,
  channels: String,
  comments: String
}

const SurveyResponse = mongoose.model("SurveyResponse", surveyResponseSchema);

const PORT = process.env.PORT || 4001;

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.get('/', function(req, res){
  res.render('form');// if jade
  // You should use one of line depending on type of frontend you are with
  //res.sendFile(__dirname + '/form.html'); //if html file is root directory
 res.sendFile("index.html"); //if html file is within public directory
});

app.post("/", function(req, res) {
  let newSurveyResponse = new SurveyResponse({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    hours: req.body.hours,
    adInfluence: req.body.adInfluence,
    channels: req.body.channels,
    comments: req.body.comments
  });
  newSurveyResponse.save();
  res.redirect('/');
})



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });