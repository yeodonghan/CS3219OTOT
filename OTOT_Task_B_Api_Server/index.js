// FileName: index.js

// Import
let express = require('express')
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');

// Initialize the app
let app = express();


// Import routes
let apiRoutes = require("./api-routes")

// Middlewares
// Configure bodyparser to handle post requests
app.use(cors());
app.use(express.urlencoded({
    extended: true
 }));
 app.use(express.json());
 // Connect to Mongoose and set connection variable
mongoose.connect('mongodb+srv://dbadmin:OIWd2dSj3ifhfpYJ@cs3219.kssu1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db");
else
    console.log("Db connected successfully");

var port = process.env.PORT || 8080;

// Use Api routes in the App
app.use('/api', apiRoutes)

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running Server on port " + port);
});