const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { auth } = require('../../middlewares/auth');
const userValidation = require('../../middlewares/userValidation')
const { userSignUpValidateSchema } = require('../signUp/signUpSchema');

const mongoose = require('mongoose');
const User = require('./mongoose_modle/user');

const router = express.Router();


router.get('/', (req, res) => {
    req.log.debug
    res.send(`Hello user from ${process.env.NODE_ENV}`);
});

//get user by id
//auth
router.get('/:userId', async (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then((doc) => {
            res.send(doc)
        })
        .catch(err => console.log(err))
})

//PUT update user
//validation
router.put('/updateProfile/:userId',
    auth,
    userValidation(userSignUpValidateSchema),
    async (req, res, next) => {
        try {
            const id = req.user.uid;
            let updatedUser = await User.findById(id);
            const { first_name, last_name, email, picture, telephone, password, confirmPassword, sports } = req.body.user;
            const { running } = sports[0];
            const { speed, distance, location } = running;
            if (first_name) {
                updatedUser.first_name = first_name;
            }
            if (last_name) {
                updatedUser.last_name = last_name;
            }
            if (email) {
                updatedUser.email = email;
            }
            if (picture) {
                updatedUser.picture = picture;
            }
            if (telephone) {
                updatedUser.telephone = telephone;
            }
            if (password !== confirmPassword) {
                res.status(404).send('passwords do not match');
                return;
            } else {
                bcrypt.hash(password, 10, async (err, hash) => {
                    if (err) next(err);
                    else {
                        updatedUser.hash_password = hash;
                    }
                });
            }
            if (speed) {
                updatedUser.sports[0].running.speed = speed;
            }
            if (distance) {
                updatedUser.sports[0].running.distance = distance;
            }
            if (location) {
                updatedUser.sports[0].running.location = location;
            }
            await updatedUser.save();
            res.status(200).send(updatedUser)
        } catch (err) {
            next(err);
        }
    })

module.exports = router;
