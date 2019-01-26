const express = require('express');
const app = express();
const path = require('path');
var mongoose = require('mongoose');
var db = mongoose.connection;
const router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handles spotify login and Auth
function spotify_login() {
  // TODO; for K
}

router.get('/',function(req,res){
  spotify_login();
  res.sendFile(path.join(__dirname+'/views/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/spotifyLogin',function(req, res){
  res.sendFile(path.join(__dirname+'/views/spotifyLogin.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/create', function(req, res){
  res.sendFile(path.join(__dirname + '/views/create.html'));
  // Continued logic for creating a room with database entries
});

router.post('/create_user', function(req, res) {

  var userID = "user ID Placeholder";
  var access_token = "access token placeholder";
  var refresh_token = "refresh token placeholder";
  var pwd = req.body.pwd;


  var newUser = new User({
      name: req.body.name,
      userID: userID,
      access_token: access_token,
      refresh_token: refresh_token,
      song: {
        name: "One More Time",
        artist: "Daft Punk",
        timestamp: "00:00:00"
      }
    });
    newUser.save();

  
});

// Add someone to a room with synchro logic
router.get('/join', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/join.html'));
  // Continued logic for joining a room, with db entries
});

router.get('/playback', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/webplaybacktest.html'));
  // Continued logic for joining a room, with db entries
});





// set up static routing
app.use(express.static(path.join(__dirname, 'public')));
//add the router
app.use('/', router);
app.use('/create', router);
app.use('join', router);
app.listen(process.env.port || 3000);

console.log("If you own airpods, I'm listening on 3000...");

db.once('open', function() {
  console.log('Connected to DB...');
});

// Connect mongoose, credentials: USER - sap_user PASS - sap_user1
mongoose.connect(
  'mongodb://sap_user:sap_user1@ds113765.mlab.com:13765/sap',
  { useNewUrlParser: true}
  );

// Creating a schema
var userSchema = new mongoose.Schema({
  name: String,
  userID: String,
  access_token: String,
  refresh_token: String,
  song: {
    name: String,
    artist: String,
    timestamp: String
  }
});


var User = mongoose.model('User', userSchema);

