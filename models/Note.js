const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: String,
    content: String,
});

module.exports = mongoose.model('Note', NoteSchema);
