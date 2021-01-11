'use strict';

var express = require('express');
var CommentController = require('../controllers/commnet');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/comment', md_auth.ensureAuth, CommentController.saveComment);
api.get('/my-comments/:page?', md_auth.ensureAuth, CommentController.getReceivedComments);
api.get('/comments/:page?', md_auth.ensureAuth, CommentController.getEmmitComments);
api.get('/unviewed-comments', md_auth.ensureAuth, CommentController.getUnviewedComments);
api.get('/set-viewed-comments', md_auth.ensureAuth, CommentController.setViewedComments);
api.get('/conversation/:user/:page?', md_auth.ensureAuth, CommentController.getConversation);
api.get('/conversation2/:page?', md_auth.ensureAuth, CommentController.getConversation2);

module.exports = api;
