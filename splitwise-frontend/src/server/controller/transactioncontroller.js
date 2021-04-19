var kafka = require("../kafka-services/client");

exports.getTransaction = async (req, res) => {
  let user = req.query.user;
  let groupName = req.query.id;
  await kafka.make_request(
    "gettransaction",
    groupName,
    function (err, results) {
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
    }
  );
  /* try {
    let paidAmount = "";
    if (user !== undefined) {
      result = await Transaction.find({
        paid_by: user,
        owed_name: user,
      });
    } else {
      // mongoose.set("debug", true);

      await Transaction.aggregate([
        {
          $match: {
            grp_id: mongoose.Types.ObjectId(groupName),
            status: "PENDING",
          },
        },

        {
          $group: {
            _id: "$transaction_id",

            trans: { $first: "$$ROOT" },
          },
        },
        { $sort: { "trans.createdAt": -1 } },
      ])
        .exec()
        .then((response, err) => {
          if (err) {
            var json = {
              data: [],
              message: "User Already Present ! Please Sign in!",
            };
            return res.status(400).json(json);
          }
          var json = {
            data: response,
            message: "Expenses added successfully!",
          };
          res.status(200).json(json);
        });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }*/
};

exports.getGroupBalances = async (req, res) => {
  let transaction = req.body;
  await kafka.make_request(
    "getgroupbalances",
    transaction,
    function (err, results) {
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
    }
  );
  /* try {
    const group = await Group.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(transaction.grp_id) } },
      {
        $lookup: {
          from: "participants",
          localField: "participants",
          foreignField: "_id",
          as: "participants",
        },
      },
    ]);
    const data = [];
    for (let participant of group[0].participants) {
      const owedAmount = await Transaction.aggregate([
        {
          $match: {
            owed_name: participant.user_name,
            status: "PENDING",
            grp_id: mongoose.Types.ObjectId(transaction.grp_id),
          },
        },
        {
          $group: {
            _id: "$owed_name",
            total_amt: { $sum: "$amount" },
            owed_name: { $first: "$owed_name" },
          },
        },
      ]);
      const paidAmount = await Transaction.aggregate([
        {
          $match: {
            paid_by: participant.user_name,
            status: "PENDING",
            grp_id: mongoose.Types.ObjectId(transaction.grp_id),
          },
        },
        {
          $group: {
            _id: "$paid_by",
            total_amt: { $sum: "$amount" },
            paid_by: { $first: "$paid_by" },
          },
        },
      ]);
      let sum = 0;
      if (owedAmount[0] !== undefined && owedAmount[0].total_amt != null) {
        sum = sum + owedAmount[0].total_amt;
      }
      if (paidAmount[0] !== undefined && paidAmount[0].total_amt != null) {
        sum = sum - paidAmount[0].total_amt;
      }
      data.push({ user: participant.user_name, total: sum });
    }
    res.json(data);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }*/
};

exports.getBalances = async (req, res) => {
  let user = req.query.user;
  await kafka.make_request("getbalances", user, function (err, results) {
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

exports.addTransaction = async (req, res) => {
  const transaction = req.body;
  await kafka.make_request(
    "addtransaction",
    transaction,
    function (err, results) {
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
    }
  );
};

exports.getTotalPaidOwedTransactions = async (req, res) => {
  const user = req.query.user;
  await kafka.make_request(
    "gettotalpaidowedtransaction",
    user,
    function (err, results) {
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
    }
  );
};

exports.transactionSettle = async (req, res) => {
  const transaction = req.body;
  await kafka.make_request(
    "settletransaction",
    transaction,
    function (err, results) {
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
    }
  );
};

exports.updateTransaction = async (req, res) => {
  const transaction = req.body;
  await kafka.make_request(
    "updatetransaction",
    transaction,
    function (err, results) {
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
    }
  );
};
