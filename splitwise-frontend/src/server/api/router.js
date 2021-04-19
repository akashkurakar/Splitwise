"use strict";

const express = require("express");

const AWS = require("aws-sdk");

const bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

const path = require("path");

const multer = require("multer");

const { checkAuth } = require("../utils/passport");

const s3 = new AWS.S3({
  accessKeyId: "AKIAXUQ3XVLVMAMGZHYT",
  secretAccessKey: "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",
});

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const upload = multer({ storage }).single("userprofile");
var router = express.Router();

const GroupController = require("../controller/groupcontroller");

const UserController = require("../controller/usercontroller");

const TransactionController = require("../controller/transactioncontroller");

const ActivityController = require("../controller/ActivityController");

const CommentController = require("../controller/CommentController");

const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require("constants");

router.post("/login", jsonParser, UserController.login);

router.put("/signup", jsonParser, UserController.signup);

router.post("/user/update", jsonParser, checkAuth, UserController.update);

router.get("/user/", UserController.userByEmail);

router.get("/user/id", UserController.userById);

router.get("/users/", UserController.users);

router.post(
  "/group/create",
  jsonParser,
  checkAuth,
  GroupController.createGroup
);

router.post("/group/leave", jsonParser, checkAuth, GroupController.leaveGroup);

router.get("/groups/", jsonParser, checkAuth, GroupController.getGroups);

router.put("/group/", jsonParser, checkAuth, GroupController.updateGroups);

router.get("/groups/all", jsonParser, checkAuth, GroupController.getAllGroups);

router.post(
  "/groups/request",
  jsonParser,
  checkAuth,
  GroupController.approveGroupRequest
);

router.get(
  "/transactions/",
  jsonParser,
  checkAuth,
  TransactionController.getTransaction
);

router.get(
  "/balances/",
  jsonParser,
  checkAuth,
  TransactionController.getBalances
);

router.post(
  "/transactions",
  jsonParser,
  checkAuth,
  TransactionController.addTransaction
);

router.post(
  "/comment/post",
  jsonParser,
  checkAuth,
  CommentController.addComment
);

router.get("/comments/", jsonParser, checkAuth, CommentController.getComments);

router.post(
  "/transactions/update",
  jsonParser,
  checkAuth,
  TransactionController.updateTransaction
);

router.get(
  "/comment/delete",
  jsonParser,
  checkAuth,
  CommentController.deleteComments
);

router.post(
  "/transactions/update",
  jsonParser,
  checkAuth,
  TransactionController.updateTransaction
);

router.post(
  "/transactions/groupbalances",
  jsonParser,
  checkAuth,
  TransactionController.getGroupBalances
);

router.get(
  "/transactions/data",
  jsonParser,
  checkAuth,
  TransactionController.getTotalPaidOwedTransactions
);

router.post(
  "/transactions/settle",
  jsonParser,
  checkAuth,
  TransactionController.transactionSettle
);

router.get(
  "/activities",
  jsonParser,
  checkAuth,
  ActivityController.getActivities
);
router.get(
  "/activities/group",
  jsonParser,
  checkAuth,
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
      res.status(500).send(error);
    }
    res.send(data);
  });
});

module.exports = router;
