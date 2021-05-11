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


router.post('/',
    async (req, res, next) => {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            first_name: req.body.first_name,
            last_name: req.body.last_name
        });
        user.save()
            .then(result => {
                console.log(result)
                res.status(200).send(result)

            })
            .catch(err => console.log(err))
    })

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

//mock data

const getAllUsers = async () => {
  const all_db_users = await users_collection.find().toArray();
  return all_db_users;
};

const mockUser = {
    firstName: "baruch",
    lastName: "baruch",
    email: "baruch@baruch.com",
    password_hash: "$2b$10$WWtl5qLj6A2bDAe.XpiqCeEbZ03wgr0L6.ayhxE/sDJHrAnrwrLum",
}

const mockChats = [
    {
        id: '10',
        posts: [
            {
                postId: 1,
                creator: 'baruch',
                postBody: 'first post',
                date: Date.now() // created in the data-base
            },
        ]
    },
    {
        id: '11',
        posts: [
            {
                postId: 2,
                creator: 'baruch',
                postBody: 'first post',
                date: Date.now()
            },
        ]
    }
]

const mockPost = {
    postId: 2,
    creator: 'jade',
    postBody: 'first post',
    date: Date.now()
}



router.post('/chat/:userId',
    //auth
    //validation
    //same user
    async (req, res, next) => {
        const body = req.body;
        res.status(200).send(body.posts[0].postBody);
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
