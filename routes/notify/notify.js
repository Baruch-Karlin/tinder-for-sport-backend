const express = require("express");
const { auth } = require("../../middlewares/auth");
const { notifyPostSchema } = require("./notifyPostSchema");
const { notifyPutSchema } = require("./notifyPutSchema");
const mongoose = require("mongoose");
const Notify = require("./mongoose_modle/notify");
const router = express.Router();
const notifyValidationMiddleware = require("../../middlewares/notifyValidation ");

router.post(
  "/",
  notifyValidationMiddleware(notifyPostSchema),
  auth,
  async (req, res) => {
    const notify = new Notify({
      _id: new mongoose.Types.ObjectId(),
      createdDate: req.body.createdDate,
      title: req.body.title,
      userId: req.user.uid,
      running: req.body.running,
    });
    notify
      .save()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => console.log(err));
  }
);

router.get("/", auth, async (req, res) => {
  Notify.find({}, function (err, result) {
    res.send(result);
  });
});

router.get("/:userId", auth, async (req, res) => {
  try {
    const userId = req.params.userId;
    const getUserNotify = await Notify.find({ userId });
    if (!getUserNotify) return;
    res.status(200).send(getUserNotify);
  } catch (err) {
    console.log(err);
  }
});

router.put(
  "/updateNotify/:userId/:notifyId",
  notifyValidationMiddleware(notifyPutSchema),
  auth,
  async (req, res) => {
    const userId = req.params.userId;
    const notifyId = req.params.notifyId;
    const updateNotify = await Notify.find({
      $and: [{ userId: userId }, { _id: notifyId }],
    });
    const { title, running } = req.body;
    const { speed, distance, location, date } = running;
    if (title) {
      updateNotify[0].title = title;
    }
    if (speed) {
      updateNotify[0].running.speed = speed;
    }
    if (distance) {
      updateNotify[0].running.distance = distance;
    }
    if (location) {
      updateNotify[0].running.location = location;
    }
    if (date) {
      updateNotify[0].running.date = date;
    }
    await updateNotify[0].save();
    res.status(200).send(updateNotify);
  }
);

router.get("/all/:userId", auth, async (req, res) => {
  const { running } = req.body;
  const findNotify = await Notify.find({
    $or: [
      { "running.speed": { $eq: running.speed } },
      { "running.distance": { $eq: running.distance } },
    ],
  });
  if (!findNotify[0]) {
    res.send("no matches found");
    return;
  }
  await findNotify[0].save();
  res.status(200).send(findNotify);
});

router.put("/response/:userId/:notifyId", auth, async (req, res) => {
  const userId = req.params.userId;
  const updateResponse = await Notify.findOneAndUpdate(
    {
      _id: req.params.notifyId,
    },
    { $push: { response: userId } }
  );
  await updateResponse.save();
  res.status(200).send(updateResponse);
});

module.exports = router;
