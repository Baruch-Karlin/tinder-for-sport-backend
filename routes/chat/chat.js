const express = require('express');
const { auth } = require('../../middlewares/auth');
const postValidationMiddleware = require('../../middlewares/postValidation');
const { postValidateSchema } = require('./postSchema');

const mongoose = require('mongoose');
const Chat = require('./mongoose_modle.js/chat');
const User = require('../user/mongoose_modle/user');

const router = express.Router();


//delete post
//only user
router.delete(
    '/delete/post/:postId/:chatId',
    auth,
    async (req, res, next) => {
        const postId = req.params.postId;
        const chatId = req.params.chatId;
        Chat.updateOne({ '_id': chatId },
            { $pull: { posts: { _id: postId } } })
            .then((result) => {
                res.status(200).send('post removed');
            })
            .catch(err => console.log(err))
     })

//this route gets one chat by the chat id
router.get(
    '/:chatId',
    auth,
    async (req, res, next) => {
        try {
            const chatId = req.params.chatId;
            const chatToFind = await Chat.findById(chatId);
            if (!chatToFind) return;
            res.status(200).send(chatToFind)
        } catch (err) {
            console.log(err)
        }
    })

//this route gets all chats that are related to a user by userId
router.get(
    '/all/:userId',
    auth,
    async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const chatsToFind = await Chat.find({ $or: [{ send_user_id: { $eq: userId } }, { accept_user_id: { $eq: userId } }] });
            if (!chatsToFind) return;
            res.status(200).send(chatsToFind)
        } catch (err) {
            console.log(err)
        }
    }
)

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
    //fix validation
    // postValidationMiddleware(postValidateSchema),
    auth,
    async (req, res, next) => {
        //finds the chat by id- params
        //finds the creator by token

        const chatId = req.params.chatId;
        const creator_id = req.user.uid;

        const chatToAddPost = await Chat.findById(chatId);
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