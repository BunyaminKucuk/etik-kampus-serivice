'use strict';

var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');
var User = require('../models/user');
var Comment = require('../models/comment');

function saveComment(req, res) {
    var params = req.body;
    if (!params.text || !params.receiver) {
        return res.status(200).send({ comment: 'Please, send the comment text and receiver...' });
    }
    var comment = new comment();
    comment.emitter = req.user.sub;
    comment.receiver = params.receiver;
    comment.text = params.text;
    comment.created_at = moment().unix();
    comment.viewed = 'false';
    comment.save((err, commentStored) => {
        if (err)
            return res.status(500).send({ comment: 'Sending comment error...' });
        if (!commentStored)
            return res.status(500).send({ comment: 'Error saving sended comment...' });

        return res.status(200).send({ comment: commentStored });
    });
}

function getReceivedComments(req, res) {
    var userId = req.user.sub;
    var itemsPerPage = 10;
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    Comment.find({ receiver: userId }).populate('emitter', 'name surname nick image _id').sort('-created_at').paginate(page, itemsPerPage, (err, comments, total) => {
        if (err)
            return res.status(500).send({ comment: 'Get comments error...' });
        if (!comments)
            return res.status(404).send({ comment: 'No comments...' });

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            comments
        });
    });
}

function getEmmitComments(req, res) {
    var userId = req.user.sub;
    var itemsPerPage = 10;
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    Comment.find({ emitter: userId }).populate('emitter receiver', 'name surname nick image _id').sort('-created_at').paginate(page, itemsPerPage, (err, comments, total) => {
        if (err)
            return res.status(500).send({ comment: 'Get comments error...' });
        if (!comments)
            return res.status(404).send({ comment: 'No comments...' });

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            comments
        });
    });
}

function getReceivedComments(req, res) {
    var userId = req.user.sub;
    var itemsPerPage = 10;
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    Comment.find({ receiver: userId }).populate('emitter', 'name surname nick image _id').sort('-created_at').paginate(page, itemsPerPage, (err, comments, total) => {
        if (err)
            return res.status(500).send({ comment: 'Get comments error...' });
        if (!comments)
            return res.status(404).send({ comment: 'No comments...' });

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            comments
        });
    });
}

function getEmmitComments(req, res) {
    var userId = req.user.sub;
    var itemsPerPage = 10;
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    Comment.find({ emitter: userId }).populate('emitter receiver', 'name surname nick image _id').sort('-created_at').paginate(page, itemsPerPage, (err, comments, total) => {
        if (err)
            return res.status(500).send({ comment: 'Get comments error...' });
        if (!comments)
            return res.status(404).send({ comment: 'No comments...' });

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            comments
        });
    });
}

function getConversation(req, res) {
    var userId = req.user.sub;
    var userId2 = req.params.user;
    var itemsPerPage = 30;
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    Comment.find({ emitter: { $in: [userId, userId2] }, receiver: { $in: [userId, userId2] } }).populate('emitter receiver', 'name surname nick image _id').sort('-created_at').paginate(page, itemsPerPage, (err, comments, total) => {
        if (err)
            return res.status(500).send({ comment: 'Get comments error...' });
        if (!comments)
            return res.status(404).send({ comment: 'No comments...' });

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            comments
        });
    });
}
function getConversation2(req, res) {
    var userId = req.user.sub;
    var itemsPerPage = 30;
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    Comment.find({ $or: [{ emitter: userId }, { receiver: userId }] }).populate('emitter receiver', 'name surname nick image _id').sort('-created_at').paginate(page, itemsPerPage, (err, comments, total) => {
        if (err)
            return res.status(500).send({ comment: 'Get comments error...' });
        if (!comments)
            return res.status(404).send({ comment: 'No comments...' });

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            comments
        });
    });

    function getUnviewedComments(req, res) {
        var userId = req.user.sub;
        Comment.count({ receiver: userId, viewed: false }).exec((err, count) => {
            if (err)
                return res.status(500).send({ comment: 'Get comments error...' });

            return res.status(200).send({
                'unviewed': count
            });
        });
    }

    function setViewedComments(req, res) {
        var userId = req.user.sub;
        Comment.update({ receiver: userId, viewed: 'false' }, { viewed: 'true' }, { "multi": true }, (err, commentsUpdated) => {
            if (err)
                return res.status(500).send({ comment: 'Set comments error...' });

            return res.status(200).send({
                comments: commentsUpdated
            });
        });
    }
    module.exports = {
        saveComment,
        getReceivedComments,
        getEmmitComments,
        getUnviewedComments,
        setViewedComments,
        getConversation,
        getConversation2
    };
}