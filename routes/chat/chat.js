const express = require('express');
const { auth } = require('../../middlewares/auth');
const postValidationMiddleware = require('../../middlewares/postValidation');
const { postValidateSchema } = require('./postSchema');

const mongoose = require('mongoose');
const Chat = require('./mongoose_modle.js/chat');
const User = require('../user/mongoose_modle/user');

const router = express.Router();


router.post(
    '/createChat/:userId',
    auth,
    async (req, res, next) => {
        //when pressing on notify- sends request to here with the user who clicked i.e :userId
        // also receives in body the id of the user who created the notify

        const senderId = req.body.id;
        const accepterId = req.user.uid;
        console.log(senderId);
        console.log(accepterId);

        const chat = new Chat({
            _id: new mongoose.Types.ObjectId(),
            send_user_id: senderId,
            accept_user_id: accepterId,
            posts: []
        })

        const createdChat = await chat.save();
        res.status(200).send(createdChat)
    })


router.post(
    '/createPost/:userId/:chatId',
    postValidationMiddleware(postValidateSchema),
    auth,
    async (req, res, next) => {
        //finds the chat by id- params
        //finds the creator by token

        const postId = req.params.postId;
        const creator_id = req.user.uid;

        const chatToAddPost = await Chat.findById(postId);
        const postCreator = await User.findById(creator_id);
        const creatorName = postCreator.first_name;
        const { content } = req.body.post;

        const post = {
            _id: new mongoose.Types.ObjectId(),
            creator_id: creator_id,
            creator_name: creatorName,
            content: content
        }
        chatToAddPost.posts.push(post)
        const createdPost = await chatToAddPost.save();
        res.status(200).send(createdPost)
    })

module.exports = router;