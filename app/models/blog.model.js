const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: String,
    description: String,
    content: String,
    author: String

}, {
    timestamps: true
})
module.exports = mongoose.model("Blog", BlogSchema);