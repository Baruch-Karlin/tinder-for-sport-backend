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

const mockUser = {
  firstName: "baruch",
  lastName: "baruch",
  email: "baruch@baruch.com",
  password_hash: "$2b$10$WWtl5qLj6A2bDAe.XpiqCeEbZ03wgr0L6.ayhxE/sDJHrAnrwrLum",
  Sports: [
    {
      Running: {
        speed: "walking",
        distance: 5,
        location: "tlv",
        time: "12:30 pm",
      },
    },
  ],
};

router.post("/", async (req, res, next) => {
  const notify = new Notify({
    _id: new mongoose.Types.ObjectId(),
    time: req.body.time,
    title: req.body.title,
    running: req.body.running,
  });
  console.log(req.body, "req.body");
  console.log(req.body.running, "Req.body.running");
  notify
    .save()
    .then((result) => {
      console.log(result, "result");
      res.status(200).send(result);
    })
    .catch((err) => console.log(err));
});

router.post('/:userId',
    //is same user
    // auth,
    notifyValidationMiddleware(notifyPostSchema),
    async (req, res, next) => {
        console.log(req.body)
        console.log(req.params)
        const notify = req.body
        //post into db
        res.status(200).send({notify});
    });

router.get("/", async (req, res, next) => {
  Notify.find({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


router.put(
  "/:userId",
  //is same user
  auth,
  notifyValidationMiddleware(notifyPutSchema),
  async (req, res, next) => {
    const notify = req.body.notify;
    //post into db
    res.status(200).send(notify);
  }
);

//exmple http://127.0.0.1:6000/notify/userId?speed=walking&distance=5&location=tlv&time=12:30 pm
router.get("/:userId", auth, async (req, res, next) => {
  console.log(req.query);
  const { speed, distance, location, time } = req.query;
  console.log(mockUser.Sports[0].Running.distance);
  //get user and change mock data
  if (
    speed === mockUser.Sports[0].Running.speed &&
    +distance === mockUser.Sports[0].Running.distance &&
    location === mockUser.Sports[0].Running.location &&
    time === mockUser.Sports[0].Running.time
  ) {
    res.status(200).send({
      notify: {
        speed,
        distance,
        location,
        time,
      },
    });
  }
});

module.exports = router;
