const express = require("express");
// const bcrypt = require('bcrypt');
// const { v4: uuidv4 } = require('uuid');
// const { upload } = require('../middlewares/imageUpload'); // for img
// const { uploadToCloudinary } = require('../lib/cloudinary'); // for img
// const fs = require('fs'); // for img
// const jwt = require('jsonwebtoken');
const { auth } = require("../../middlewares/auth");
// const { checkIfAdmin } = require('../middlewares/checkAdmin'); // admin middle
const notifyValidationMiddleware = require("../../middlewares/notifyValidation ");
const { notifyPostSchema } = require("./notifyPostSchema");
const { notifyPutSchema } = require("./notifyPutSchema");
const mongoose = require("mongoose");
const Notify = require("./mongoose_modle/notify");
const router = express.Router();

router.post("/", auth, async (req, res, next) => {
  const notify = new Notify({
    _id: new mongoose.Types.ObjectId(),
    createdDate: req.body.createdDate,
    title: req.body.title,
    userId: req.user.uid,
    running: req.body.running,
  });
  console.log(req.body, "req.body");
  notify
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => console.log(err));
});

router.get("/", auth, async (req, res, next) => {
  Notify.find({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.get("/:userId", auth, async (req, res, next) => {
  const userId = req.params.userId;
  Notify.findOne({ userId: userId })
    .exec()
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => console.log(err));
});

// router.put("/updateNotify:userId", auth, async (req, res, next) => {
//   const userId = req.params.userId;
//  const updateNotify = await Notify.findOne({ userId: userId });
//  const {title, running} = req.body
//  const {speed, distance, location, date} = running;
//  if (title) {
//   updateNotify.title = title;
//   await updateNotify.save();
// }
// res.status(200).send(updateNotify)
// })

//   //get user and change mock data
//   if (
//     speed === mockUser.Sports[0].Running.speed &&
//     +distance === mockUser.Sports[0].Running.distance &&
//     location === mockUser.Sports[0].Running.location &&
//     time === mockUser.Sports[0].Running.time
//   ) {
//     res.status(200).send({
//       notify: {
//         speed,
//         distance,
//         location,
//         time,
//       },
//     });
//   }
// });

module.exports = router;
