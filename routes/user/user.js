const express = require('express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
// const { upload } = require('../middlewares/imageUpload'); // for img
// const { uploadToCloudinary } = require('../lib/cloudinary'); // for img
// const fs = require('fs'); // for img
const jwt = require('jsonwebtoken');
const { auth } = require('../../middlewares/auth');
// const { checkIfAdmin } = require('../middlewares/checkAdmin'); // admin middle
const postValidationMiddleware = require('../../middlewares/postValidation');
const chatValidationMiddleware = require('../../middlewares/cahtValidation');

const { postValidateSchema } = require('./postSchema');
const { chatValidateSchema } = require('./chatSchema');

const mongoose = require('mongoose');
const User = require('./mongoose_modle/user');

const router = express.Router();

//get user by id
//auth
router.get('/:userId', async (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then((doc) => {
            console.log(doc)
            res.send(doc)
        })
        .catch(err => console.log(err))
})

//PUT update user
//validation
router.put('/updateProfile/:userId',
    auth,
    async (req, res, next) => {
        try {
            //check for user if the user exists
            const id = req.user.uid;
            const updatedUser = await User.findById(id);
            const { first_name, last_name, email, picture, telephone, password, confirmPassword, sports } = req.body.user;
            const { running } = sports[0];
            const { speed, distance, location } = running;
            if (first_name) {
                updatedUser.first_name = first_name;
                await updatedUser.save();
            }
            if (last_name) {
                updatedUser.last_name = last_name;
                await updatedUser.save();
            }
            if (email) {
                updatedUser.email = email;
                await updatedUser.save();
            }
            if (picture) {
                updatedUser.picture = picture;
                await updatedUser.save();
            }
            if (telephone) {
                updatedUser.telephone = telephone;
                await updatedUser.save();
            }
            if (password !== confirmPassword) {
                res.status(404).send('passwords do not match');
                return;
            } else {
                bcrypt.hash(password, 10, async (err, hash) => {
                    if (err) next(err);
                    else {
                        updatedUser.hash_password = hash;
                        await updatedUser.save();
                    }
                });
            }
            if (speed) {
                updatedUser.sports[0].running.speed = speed;
                await updatedUser.save();
            }
            if (distance) {
                updatedUser.sports[0].running.distance = distance;
                await updatedUser.save();
            }
            if (location) {
                updatedUser.sports[0].running.location = location;
                await updatedUser.save();
            }
            res.status(200).send(updatedUser)
        } catch (err) {
            next(err);
        }
    })







///////////////////    chat api - to be removed from here!!11/////
// not good- need to be able to add multiple chats
router.post('/chat/:userId',
    auth,
    chatValidationMiddleware(chatValidateSchema),
    //same user
    //check if exists posts[0] if yes return
    async (req, res, next) => {
        const id = req.params.userId;
        const newChat = req.body;
        console.log('2', newChat.chat[0].posts[0]);
        const result = await User.updateOne({ _id: id }, {
            $set: {
                chat:
                    [{
                        _id: new mongoose.Types.ObjectId(),
                        posts: [{
                            _id: new mongoose.Types.ObjectId(),
                            name: newChat.chat[0].posts[0].name,
                            body: newChat.chat[0].posts[0].body
                        }]
                    }]
            }
        });
        // should also update reciving user
        res.status(200).send(newChat.chat[0].posts[0]);
    })

router.post('/chat/:userId/:chatId',
    //auth
    // postValidationMiddleware(postValidateSchema),
    //same user
    async (req, res, next) => {
        // instead of find query db
        const id = req.params.userId;
        const chatId = req.params.chatId
        const post = req.body
        const updatedUser = await User.findById(id);
        // console.log(updatedUser);
        // console.log(post)
        // need to find index of chat
        const arr = updatedUser.chat[0].posts.push(post);
        await updatedUser.save()
        res.status(200).send(updatedUser.chat[0].posts)





        // const foundChat = mockChats.find((chat) => {
        //     if (chat.id == req.params.chatId)
        //         return (chat);
        // })
        // //instead of push add
        // console.log(post)
        // //create an id + date in the db
        // foundChat.posts.push(post)
        // res.status(200).send(foundChat);
    })


module.exports = router;
