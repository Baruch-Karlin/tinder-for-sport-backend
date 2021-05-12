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
            console.log(req.user.uid)
            //check for user if the user exists
            res.send(req.user.uid)
                // //  create user
                // const user = new User({
                //     _id: new mongoose.Types.ObjectId(),
                //     first_name: req.body.user.first_name,
                //     last_name: req.body.user.last_name,
                //     email: req.body.user.email,
                //     hash_password: hash,
                //     telephone: req.body.user.telephone,
                //     picture: req.body.user.picture,
                //     sports: req.body.user.sports,
                //     chat: [],
                // });
                // const token = jwt.sign({ uid: user.uid }, 'sfdsf5sfs64s65f4sdfsdf')

                // user.save()
                //     .then(result => {
                //         console.log(result)
                //         res.status(200).send({
                //             token,
                //             user: result
                //         })
                //     })
                //     .catch(err => console.log(err))
            
        } catch (err) {
            next(err);
        }
    })





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
        const postSender = await User.findById(id);
        // console.log(postSender);
        // console.log(post)
        // need to find index of chat
        const arr = postSender.chat[0].posts.push(post);
        await postSender.save()
        res.status(200).send(postSender.chat[0].posts)





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
