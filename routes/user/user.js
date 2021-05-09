const express = require('express');
const bcrypt = require('bcrypt');
// const { upload } = require('../middlewares/imageUpload'); // for img
// const { uploadToCloudinary } = require('../lib/cloudinary'); // for img
// const fs = require('fs'); // for img
const jwt = require('jsonwebtoken'); 
// const { auth } = require('../middlewares/auth'); authentication middle
// const { checkIfAdmin } = require('../middlewares/checkAdmin'); // admin middle
// const validationMiddleware = require('../middlewares/validation'); 
// 

const router = express.Router();

//mock data
const mockUser = {
    firstName: "baruch",
    lastName: "baruch",
    email: "baruch@baruch.com",
    password_hash: "$2b$10$WWtl5qLj6A2bDAe.XpiqCeEbZ03wgr0L6.ayhxE/sDJHrAnrwrLum",
}


router.post('/user/chat',
    async (req, res, next) => {
        //check 
        
        const {body} = req.body;
        res.status(200)
    })

module.exports = router;
