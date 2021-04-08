const Transaction = require("../models/transactionmodel");
const Group = require("../models/groupmodel");
const Activity = require("../models/ActivityModel");
const User = require("../models/usermodel");
const mongoose = require("mongoose");

exports.getTransaction = async (req, res) => {
  let user = req.query.user;
  let groupName = req.query.id;
  try {
    let paidAmount = "";
    if (user !== undefined) {
      result = await Transaction.find({
        paid_by: user,
        owed_name: user,
      });
    } else {
      // mongoose.set("debug", true);

      await await Transaction.aggregate([
        { $sort: { createdAt: 1 } },
        {
          $match: {
            grp_id: mongoose.Types.ObjectId(groupName),
            status: "PENDING",
          },
        },
        { $sort: { updated_at: -1 } },
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
  }
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
    } else if (paidAmount.length === 0) {
      let balance = parseFloat(owedAmount[0]["total_amt"]);
      result = {
        balance: balance,
        owedAmount: parseFloat(owedAmount[0]["total_amt"]),
        paidAmount: 0.0,
      };
      res.json(result);
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
    const activities = [];
    const group = await Group.findById({
      _id: transaction.grpId,
    }).populate({
      path: "participants",
    });
    const newExpense = [];
    for (let participant of group.participants) {
      const tran = {};
      const user = User.findById({ _id: transaction.user });
      if (participant.user_name.toString() !== transaction.user) {
        const activity = new Activity();
        if (participant.status === "active") {
          activity.activity_name = "transaction added";
          activity.grp_id = transaction.grpId;
          activity.user_name = participant.user_name;
          activity.description = `${user.name} added expense as ${transaction.description} in ${group.grp_name}`;
          tran.tran_name = transaction.description;
          tran.amount = transaction.amount / group.participants.length;
          tran.bill_amt = transaction.amount;
          tran.paid_by = transaction.user;
          tran.owed_name = participant.user_name;
          tran.transaction_id = tran_id;
          tran.status = "PENDING";
          tran.grp_id = transaction.grpId;
          newExpense.push(tran);
        } else {
          activity.activity_name = "transaction added";
          activity.grp_id = transaction.grpId;
          activity.user_name = transaction.user;
          activity.description = `You paid for ${transaction.description} in ${group.grp_name}`;
        }
        activities.push(activity);
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
    await Activity.insertMany(activities);
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

      const activities = [];
      const activity = new Activity();
      activity.activity_name = "transaction settled";
      activity.grp_id = "";
      activity.user_name = transaction.user1;
      activity.description = `${transaction.user2} settled up woth you`;
      activities.push(activity);
      activity.activity_name = "transaction settled";
      activity.grp_id = "";
      activity.user_name = transaction.user2;
      activity.description = `${transaction.user1} settled up woth you`;
      activities.push(activity);
      Activity.insertMany(activities);
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

exports.updateTransaction = async (req, res) => {
  const transaction = req.body;
  try {
    const expense = await Transaction.find({
      transaction_id: transaction.transaction_id,
    });

    let newBillAmt = parseInt(transaction.bill_amt / (expense.length + 1));
    await Transaction.updateMany(
      {
        transaction_id: transaction.transaction_id,
      },
      {
        $set: {
          bill_amt: transaction.bill_amt,
          amount: newBillAmt,
          tran_name: transaction.tran_name,
        },
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
