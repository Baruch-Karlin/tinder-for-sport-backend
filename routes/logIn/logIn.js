const express = require('express');
const validationMiddleware = require('../../middlewares/userValidation');
const { userLogInValidateSchema } = require('./logInSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../user/mongoose_modle/user')
const router = express.Router();

//post /login
router.post('/',
    validationMiddleware(userLogInValidateSchema),
    async (req, res, next) => {
        const { email, password } = req.body.user;
        const user = await User.find({ email: { $eq: req.body.user.email } })
        if (!user[0]) {
            res.status(404).send('User not found with this email');
            return;
        }
        bcrypt.compare(password, user[0].hash_password, (err, result) => {
            if (err) throw new Error(err);
            else {
                if (result) {
                    const token = jwt.sign({ uid: user[0]._id }, 'sfdsf5sfs64s65f4sdfsdf')
                    res.status(200).send({
                        token,
                        user: user[0]
                    })
                }
                else {
                    return res.send({ success: false, message: 'Inserted password does not match this E-mail account' });
                }
            }
        })
    });


module.exports = router;

