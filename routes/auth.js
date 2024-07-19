const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    const token = jwt.sign(req.user.toJSON(), 'your_jwt_secret');
    res.cookie('jwt', token, { httpOnly: true });
    res.redirect('/');
});

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
    const token = jwt.sign(req.user.toJSON(), 'your_jwt_secret');
    res.cookie('jwt', token, { httpOnly: true });
    res.redirect('/');
});

module.exports = router;
