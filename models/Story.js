const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    date: {
        type: Date,
        default: Date.now
    }
});

const Story = mongoose.model('Story', StorySchema);

module.exports = Story;