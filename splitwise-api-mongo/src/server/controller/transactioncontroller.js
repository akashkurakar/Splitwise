const TransactionService = require("../services/transactionservice");
const Transaction = require("../models/transactionmodel");
const Group = require("../models/groupmodel");
const mongoose = require("mongoose");
let transactionService = new TransactionService();

exports.getTransaction = async (req, res) => {
  let user = req.query.user;
  let groupName = req.query.id;
  try {
    let paidAmount = "";
    if (user !== undefined) {
      result = await Transaction.find({ paid_by: user, owed_name: user });
    } else {
      // mongoose.set("debug", true);

      await await Transaction.aggregate([
        {
          $match: {
            grp_id: mongoose.Types.ObjectId(groupName),
            status: "PENDING",
          },
        },
        { $group: { _id: "$transaction_id", trans: { $first: "$$ROOT" } } },
      ]).then((response, err) => {
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
  }
  res.end();
};

exports.getGroupBalances = async (req, res) => {
  let transaction = req.body;
  try {
    res.json(await transactionService.getGroupBalances(transaction));
    res.end();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  res.end();
};

exports.getBalances = async (req, res) => {
  let user = req.query.user;

  try {
    const owedAmount = await Transaction.aggregate([
      { $match: { owed_name: user, status: "PENDING" } },
      {
        $group: {
          _id: "$owed_name",
          total_amt: { $sum: "$amount" },
          owed_name: { $first: "$owed_name" },
        },
      },
    ]);
    const paidAmount = await Transaction.aggregate([
      { $match: { paid_by: user, status: "PENDING" } },
      {
        $group: {
          _id: "$paid_by",
          total_amt: { $sum: "$amount" },
          paid_by: { $first: "$paid_by" },
        },
      },
    ]);
    if (owedAmount.length !== 0 && paidAmount.length !== 0) {
      let balance = parseFloat(
        paidAmount[0]["total_amt"] - owedAmount[0]["total_amt"]
      );
      result = {
        balance: balance,
        paidAmount: paidAmount[0]["total_amt"],
        owedAmount: owedAmount[0]["total_amt"],
      };
      res.json(result);
    } else if (owedAmount.length === 0) {
      let balance = parseFloat(paidAmount[0]["total_amt"]);
      result = {
        balance: balance,
        paidAmount: parseFloat(paidAmount[0]["total_amt"]),
        owedAmount: 0.0,
      };
      res.json(result);
      res.send(json);
    } else if (paidAmount.length === 0) {
      let balance = parseFloat(owedAmount[0]["total_amt"]);
      result = {
        balance: balance,
        owedAmount: parseFloat(owedAmount[0]["total_amt"]),
        paidAmount: 0.0,
      };
      res.json(result);
      res.send(json);
    } else {
      var json = { data: [], message: "" };
      res.send(json);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  res.end();
};

exports.addTransaction = async (req, res) => {
  const transaction = req.body;
  try {
    const tran_id = makeid();
    const group = await Group.findById({
      _id: transaction.grpId,
    }).populate({
      path: "participants",
    });
    const newExpense = [];
    for (let participant of group.participants) {
      const tran = {};
      if (participant.user_name.toString() !== transaction.user) {
        if (participant.status === "active") {
          tran.tran_name = transaction.description;
          tran.amount = transaction.amount / group.participants.length;
          tran.bill_amt = transaction.amount;
          tran.paid_by = transaction.user;
          tran.owed_name = participant.user_name;
          tran.transaction_id = tran_id;
          tran.status = "PENDING";
          tran.grp_id = transaction.grpId;
          newExpense.push(tran);
        }
        //  group.transactions.push(tran);
      }
    }
    if (newExpense.length < 1) {
      var json = {
        data: [],
        message: "No more than one member active!",
      };
      return res.status(200).json(json);
    }
    let groupTransactions = await Transaction.insertMany(newExpense);
    await Group.findByIdAndUpdate(
      { _id: transaction.grpId },
      {
        $push: { transactions: groupTransactions },
      }
    ).then((response, err) => {
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
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getTotalPaidOwedTransactions = async (req, res) => {
  const user = req.query.user;
  try {
    const owedAmount = await Transaction.aggregate([
      { $match: { owed_name: user, status: "PENDING" } },
      {
        $group: {
          _id: "$owed_name",
          paid_by: { $first: "$paid_by" },
          owed_name: { $first: "$owed_name" },
          grp_id: { $first: "$grp_id" },
          total_amt: { $sum: "$amount" },
        },
      },
    ]);
    const paidAmount = await Transaction.aggregate([
      { $match: { paid_by: user, status: "PENDING" } },
      {
        $group: {
          _id: "$paid_by",
          owed_name: { $first: "$owed_name" },
          paid_by: { $first: "$paid_by" },
          grp_id: { $first: "$grp_id" },
          total_amt: { $sum: "$amount" },
        },
      },
    ]);
    const paidAmoutninGroup = await Transaction.aggregate([
      { $match: { paid_by: user, status: "PENDING" } },
      {
        $group: {
          _id: "$paid_by",
          owed_name: { $first: "$owed_name" },
          paid_by: { $first: "$paid_by" },
          grp_id: { $first: "$grp_id" },
          total_amt: { $sum: "$amount" },
        },
      },
    ]);
    const owedAmoutninGroup = await Transaction.aggregate([
      { $match: { owed_name: user, status: "PENDING" } },
      {
        $group: {
          _id: "$owed_name",
          paid_by: { $first: "$paid_by" },
          owed_name: { $first: "$owed_name" },
          grp_id: { $first: "$grp_id" },
          total_amt: { $sum: "$amount" },
        },
      },
    ]);
    const data = {
      oweData: paidAmount,
      owedData: owedAmount,
      oweList: paidAmoutninGroup,
      owedList: owedAmoutninGroup,
    };
    res.json(data);
  } catch (e) {
    console.log(e);
    res.sendStatus(403);
  }
  res.end();
};

exports.transactionSettle = async (req, res) => {
  const transaction = req.body;
  try {
    await Transaction.updateMany(
      {
        $or: [
          {
            paid_by: transaction.user1,
            owed_name: transaction.user2,
          },
          {
            paid_by: transaction.user2,
            owed_name: transaction.user1,
          },
        ],
      },
      /*{
        paid_by: transaction.user1,
        owed_name: transaction.user2,
        paid_by: transaction.user2,
        owed_name: transaction.user1,
      },*/
      {
        $set: { status: "settled" },
      },
      { upsert: true }
    ).then((response, err) => {
      if (err) {
        var json = {
          data: [],
          message: "Error while settling transactions!",
        };
        return res.status(200).json(json);
      }
      var json = {
        data: response,
        message: "Transaction Settled",
      };
      res.status(200).json(json);
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

function makeid() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
