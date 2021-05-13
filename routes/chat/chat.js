const express = require('express');
const { auth } = require('../../middlewares/auth');
// const postValidationMiddleware = require('../../middlewares/postValidation');
// const chatValidationMiddleware = require('../../middlewares/cahtValidation');
// const { postValidateSchema } = require('./postSchema');
// const { chatValidateSchema } = require('./chatSchema');

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



// ///////////////////    chat api - to be removed from here!!11/////
// // not good- need to be able to add multiple chats
// router.post('/chat/:userId',
//     auth,
//     chatValidationMiddleware(chatValidateSchema),
//     //same user
//     //check if exists posts[0] if yes return
//     async (req, res, next) => {
//         const id = req.params.userId;
//         const newChat = req.body;
//         console.log('2', newChat.chat[0].posts[0]);
//         const result = await User.updateOne({ _id: id }, {
//             $set: {
//                 chat:
//                     [{
//                         _id: new mongoose.Types.ObjectId(),
//                         posts: [{
//                             _id: new mongoose.Types.ObjectId(),
//                             name: newChat.chat[0].posts[0].name,
//                             body: newChat.chat[0].posts[0].body
//                         }]
//                     }]
//             }
//         });
//         // should also update reciving user
//         res.status(200).send(newChat.chat[0].posts[0]);
//     })

// router.post('/chat/:userId/:chatId',
//     //auth
//     // postValidationMiddleware(postValidateSchema),
//     //same user
//     async (req, res, next) => {
//         // instead of find query db
//         const id = req.params.userId;
//         const chatId = req.params.chatId
//         const post = req.body
//         const updatedUser = await User.findById(id);
//         // console.log(updatedUser);
//         // console.log(post)
//         // need to find index of chat
//         const arr = updatedUser.chat[0].posts.push(post);
//         await updatedUser.save()
//         res.status(200).send(updatedUser.chat[0].posts)


//         // const foundChat = mockChats.find((chat) => {
//         //     if (chat.id == req.params.chatId)
//         //         return (chat);
//         // })
//         // //instead of push add
//         // console.log(post)
//         // //create an id + date in the db
//         // foundChat.posts.push(post)
//         // res.status(200).send(foundChat);
//     })

module.exports = router;