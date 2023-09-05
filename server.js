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
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    // Check if the username is already taken
    User.findOne({ username }, (err, user) => {
        if (err) {
            res.json({ success: false, message: "Registration failed." });
        } else if (user) {
            res.json({ success: false, message: "Username is already taken." });
        } else {
            // Create a new user
            const newUser = new User({ username, password });

            newUser.save((err) => {
                if (err) {
                    res.json({ success: false, message: "Registration failed" });
                } else {
                    res.json({ success: true, message: "Registration successful." });
                }
            });
        }
    });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Find the user by username and check the password
    User.findOne({ username, password }, (err, user) => {
        if (err) {
            res.json({ success: false, message: "Login failed." });
        } else if (!user) {
            res.json({ success:false, message: "Username or password is incorrect." });
        } else {
            // Store the user session (you can use express-session)
            req.session.user = user;
            res.json({ success: true, message: "Login successful." });
        }
    });
});

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect("/login");
}

// Protect a route
app.get("/dashboard", isAuthenticated, (req, res) => {
    // Render the dashboard for authenticated users
    res.render("dashboard");
})


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});