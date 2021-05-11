const express = require('express');
const validationMiddleware = require('../../middlewares/userValidation');
const { userSignUpValidateSchema } = require('./signUpSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

//post /signup
router.post('/',
    validationMiddleware(userSignUpValidateSchema),
    async (req, res, next) => {
        try {
            const sentUser = req.body.user;
            console.log(sentUser)
            const { firstName, lastName, email, password, confirmPassword } = sentUser;
            if (password == confirmPassword) {
                bcrypt.hash(password, 10, async (err, hash) => {
                    if (err) next(err);
                    else {
                        //check if the user exists
                        // const checkedUser = await getUserByEmail(email);
                        // if (checkedUser) {
                        //     res.status(403).send('User already exists with this email');
                        //     return;
                        // }
                    }
                    //  create user
                    // await addUser(firstName, lastName, email, hash);
                    // const user = await getUserByEmail(email);
                    
                    ////////////////////////////////////this to erase below////////////////////////////
                    const user = {
                        firstName,
                        lastName,
                        email,
                        passwordHash: hash
                    }
                    ////////////////////////////////////////this to erase above///////////////////////
                    const token = jwt.sign({ uid: user.uid }, 'sfdsf5sfs64s65f4sdfsdf');
                    console.log(token)
                    res.send({
                        hash,
                        token,
                        user: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                        }
                    })
                });
            } else {
                res.status(404).send('passwords do not match');
                return;
            }
        } catch (err) {
            next(err);
        }
    });


module.exports = router;