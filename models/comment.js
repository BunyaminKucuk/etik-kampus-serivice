'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = Schema({
    emitter: { type: Schema.ObjectId, ref: 'User' },
    receiver: { type: Schema.ObjectId, ref: 'User' },
    commenttext: String,
    created_at: String,
    viewed: String
});

module.exports = mongoose.model('Comment', CommentSchema);
