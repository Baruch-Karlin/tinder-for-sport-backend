const express = require('express');
const validationMiddleware = require('../../middlewares/userValidation');
const { userLogInValidateSchema } = require('./logInSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// mock data

const mockUser = {
    firstName: "baruch",
    lastName: "baruch",
    email: "baruch@baruch.com",
    password_hash: "$2b$10$WWtl5qLj6A2bDAe.XpiqCeEbZ03wgr0L6.ayhxE/sDJHrAnrwrLum",
}


//post /login
router.post('/',
    validationMiddleware(userLogInValidateSchema),
    async (req, res, next) => {
        const { email, password } = req.body.user;
        
        //need to add req to db
        // const user = await getUserByEmail(email);

        const user = mockUser;
        if (!user) {
            res.status(404).send('User not found with this email');
            return;
        }
        bcrypt.compare(password, user.password_hash, (err, result) => {
            if (err) throw new Error(err);
            else {
                if (result) {
                    const token = jwt.sign({ uid: user.uid }, 'sfdsf5sfs64s65f4sdfsdf')
                    res.status(200).send({
                        token,
                        //
                        user: {
                            firstName: user.firstName,
                            lastName: user.lastName
                        }
                    })
                }
                else {
                    return res.send({ success: false, message: 'Inserted password does not match this E-mail account' });
                }
            }
        })
    });


module.exports = router;

