var kafka = require("../kafka-services/client");

exports.addComment = async (req, res) => {
  const data = req.body;
  await kafka.make_request("addcomment", data, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else" + results);
      res.send(results);
      res.end();
    }
  });
};

exports.deleteComments = async (req, res) => {
  const comment = req.query.id;
  await kafka.make_request("deletecomments", comment, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else" + results);
      res.send(results);
      res.end();
    }
  });
};

exports.getComments = async (req, res) => {
  const tran_id = req.query.id;
  await kafka.make_request("getcomments", tran_id, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else" + results);
      res.send(results);
      res.end();
    }
  });
};
