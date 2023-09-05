// Import the necessary packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

// Create an Express app
const app = express();

// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure session
app.use(session({
    secret: 'your-secret-key', // Change this to a secure secret key
    resave: false,
    saveUninitialized: true
}));

// Connect to MongoDB(you'll need to install and configure Mongoose)
mongoose.connect('mongodb://localhost:27017/calorie_tracker', { useNewUrlParser: true, useUnifiedTopology: true });

// Define User Schema and Model (using Mongoose)
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', UserSchema);

// Other routes and middleware can be defined here

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});