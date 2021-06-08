"use strict";

const express = require("express");

const AWS = require("aws-sdk");
const bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

const path = require("path");

const multer = require("multer");

const s3 = new AWS.S3({
  accessKeyId: "",
  secretAccessKey: "",
});

/*const storage = multer.diskStorage({
  destination: "./splitwise-api/public/upload/",

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});*/
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const upload = multer({ storage }).single("userprofile");
var router = express.Router();

const GroupController = require("../controller/groupcontroller");

const UserController = require("../controller/usercontroller");

const InvitationController = require("../controller/invitationcontroller");

const TransactionController = require("../controller/transactioncontroller");

const ParticipantController = require("../controller/participantcontroller");

const ActivityController = require("../controller/ActivityController");
const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require("constants");

router.post("/login", jsonParser, UserController.login);

router.put("/signup", jsonParser, UserController.signup);

router.post("/user/update", jsonParser, UserController.update);

router.get("/user/", UserController.userByEmail);

router.get("/user/id", UserController.userById);

router.get("/users/", UserController.user);

router.post("/group/create", jsonParser, GroupController.createGroup);

router.post("/group/leave", jsonParser, GroupController.leaveGroup);

router.get("/groups/", jsonParser, GroupController.getGroups);

router.put("/group/", jsonParser, GroupController.updateGroups);

router.get("/groups/all", jsonParser, GroupController.getAllGroups);

router.post("/groups/request", jsonParser, GroupController.approveGroupRequest);

router.post("/notify/send", jsonParser, InvitationController.sendInvitation);

router.get("/notify/", jsonParser, InvitationController.sendInvitation);

router.get(
  "/notifications/",
  jsonParser,
  InvitationController.getInvitationList
);

router.get("/transactions/", jsonParser, TransactionController.getTransaction);

router.get("/balances/", jsonParser, TransactionController.getBalances);

router.post("/transactions", jsonParser, TransactionController.addTransaction);

router.post(
  "/transactions/groupbalances",
  jsonParser,
  TransactionController.getGroupBalances
);

router.post("/participant", jsonParser, ParticipantController.addParticipant);
router.get(
  "/transactions/data",
  jsonParser,
  TransactionController.getTotalPaidOwedTransactions
);

router.post(
  "/transactions/settle",
  jsonParser,
  TransactionController.transactionSettle
);

router.get("/participants", jsonParser, ParticipantController.getParticipant);

router.get("/activities", jsonParser, ActivityController.getActivities);
router.get(
  "/activities/group",
  jsonParser,
  ActivityController.getActivitiesByGroup
);

router.put("/uploadfile/", upload, (req, res) => {
  const params = {
    Bucket: "splitwise-bucket",
    Key: `${req.file.originalname}`,
    Body: req.file.buffer,
  };
  s3.upload(params, (error, data) => {
    if (error) {
      res.send(500).send(error);
    }
    res.send(data);
  });
});

module.exports = router;
