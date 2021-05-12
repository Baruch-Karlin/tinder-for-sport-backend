const express = require('express');
const validationMiddleware = require('../../middlewares/userValidation');
const {
    userSignUpValidateSchema
} = require('./signUpSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
                                picture: req.body.user.picture,
                                sports: req.body.user.sports,
                                chat: [],
                            });
                            const token = jwt.sign({
                                uid: user.uid
                            }, 'sfdsf5sfs64s65f4sdfsdf')

                            user.save()
                                .then(result => {
                                    console.log(result)
                                    res.status(200).send({
                                        token,
                                        user: result
                                    })
                                })
                                .catch(err => console.log(err))
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


module.exports = router;