const express = require('express');
const validationMiddleware = require('../../middlewares/userValidation');
const {
    userSignUpValidateSchema
} = require('./signUpSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    upload
} = require('../../middlewares/imageUpload');
const fs = require('fs');
const { uploadToCloudinary } = require('../../lib/cloudinary');
const { auth } = require('../../middlewares/auth');
const mongoose = require('mongoose');
const User = require('../user/mongoose_modle/user')

const router = express.Router();

router.post('/',
    validationMiddleware(userSignUpValidateSchema),
    async(req, res, next) => {
        try {
            const {
                password,
                confirmPassword
            } = req.body.user;
            if (password == confirmPassword) {
                bcrypt.hash(password, 10, async(err, hash) => {
                    if (err) next(err);
                    else {
                        //check if the user exists
                        const checkedUser = await User.find({
                            email: {
                                $eq: req.body.user.email
                            }
                        })
                        if (checkedUser[0]) {
                            console.log(checkedUser[0])
                            res.status(403).send('User already exists with this email');
                            return;
                        } else {
                            //  create user
                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                first_name: req.body.user.first_name,
                                last_name: req.body.user.last_name,
                                email: req.body.user.email,
                                hash_password: hash,
                                telephone: req.body.user.telephone,
                                sports: req.body.user.sports,
                            });
                            const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET)
                            user.save()
                                .then(result => {
                                    res.status(200).send({
                                        token,
                                        user: result
                                    })
                                })
                                // .catch(err => console.log(err))
                        }
                    }
                })
            } else {
                res.status(404).send('passwords do not match');
                return;
            }
        } catch (err) {
            next(err);
        }
    })


router.put('/picture_url',
    upload.single('profile_picture'),
    auth,
    async (req, res, next) => {
        try{
            const id = req.user.uid;
            const updatedUser = await User.findById(id);
            const result = await uploadToCloudinary(req.file.path)
            if (result) {
                updatedUser.picture = result.secure_url;
                await updatedUser.save();
            }
            fs.unlinkSync(req.file.path)
            res.status(200).send(updatedUser.picture);
        } catch (err) {
            console.log(err);
        }
    }
);

module.exports = router;