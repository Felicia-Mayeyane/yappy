const express = require('express');
const jwt = require('jsonwebtoken');
const Note = require('../models/Note');

const router = express.Router();

const authenticate = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.sendStatus(401);
    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

router.get('/', authenticate, async (req, res) => {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
});

router.post('/', authenticate, async (req, res) => {
    const note = new Note({
        user: req.user._id,
        title: req.body.title,
        content: req.body.content,
    });
    await note.save();
    res.json(note);
});

router.delete('/:id', authenticate, async (req, res) => {
    await Note.deleteOne({ _id: req.params.id, user: req.user._id });
    res.sendStatus(204);
});

module.exports = router;
