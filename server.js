const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');
const connectDB = require('./config/db');

// Load config
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 3002;

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Passport config
require('./config/passport')(passport);

// Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
        }),
    })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;

