const express = require('express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
// const { upload } = require('../middlewares/imageUpload'); // for img
// const { uploadToCloudinary } = require('../lib/cloudinary'); // for img
// const fs = require('fs'); // for img
const jwt = require('jsonwebtoken');
// const { auth } = require('../middlewares/auth'); authentication middle
// const { checkIfAdmin } = require('../middlewares/checkAdmin'); // admin middle
const postValidationMiddleware = require('../../middlewares/postValidation');
const { postValidateSchema } = require('./postSchema');

const mongoose = require('mongoose');
const User = require('./mongoose_modle/user');

const router = express.Router();


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

// const user = await User.findById(id);
// console.log('1', user);


router.post('/chat/:userId',
    //auth
    //validation
    //same user
    async (req, res, next) => {
        const id = req.params.userId;
        const newChat = req.body;
        console.log('2', newChat.chat[0].posts[0]);
        const result = await User.updateOne({ _id: id }, {
            $set: {
                chat:
                    [
                        {
                            _id: new mongoose.Types.ObjectId(),
                            posts: [
                                {
                                    _id: new mongoose.Types.ObjectId(),
                                    name: newChat.chat[0].posts[0].name,
                                    body: newChat.chat[0].posts[0].body
                                }
                            ]

                        }
                    ]

            }
        });
        console.log(result)
        res.status(200).send(newChat);
    })

router.post('/chat/:userId/:chatId',
    //auth
    postValidationMiddleware(postValidateSchema),
    //same user
    async (req, res, next) => {
        // instead of find query db
        const post = req.body

        const foundChat = mockChats.find((chat) => {
            if (chat.id == req.params.chatId)
                return (chat);
        })
        //instead of push add
        console.log(post)
        //create an id + date in the db
        foundChat.posts.push(post)
        res.status(200).send(foundChat);
    })


module.exports = router;
