const TransactionService = require("../services/transactionservice");

let transactionService = new TransactionService();

exports.getTransaction = async (req, res) => {
  let user = req.query.user;
  let groupName = req.query.id;
  try {
    let result = "";
    if (user !== undefined) {
      result = await transactionService.getTransactionByUser(user);
    } else {
      result = await transactionService.getTransactionByGroup(groupName);
    }

    res.json(result);
    res.end();
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
    let result = "";
    if (user !== null) {
      let owedAmount = await transactionService.getOwedTransactionByUser(user);
      let paidAmount = await transactionService.getPaidTransactionByUser(user);
      let balance = parseFloat(
        paidAmount[0]["sum(amount)"] - owedAmount[0]["sum(amount)"]
      );
      result = {
        balance: balance,
        paidAmount: paidAmount[0]["sum(amount)"],
        owedAmount: owedAmount[0]["sum(amount)"],
      };
    }

    res.json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  res.end();
};

exports.addTransaction = async (req, res) => {
  const transaction = req.body;
  try {
    let result = await transactionService.addTransaction(transaction);
    res.json({ data: [], message: result });
    res.send();
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  res.end();
};

exports.getTotalPaidOwedTransactions = async (req, res) => {
  const user = req.query.user;
  try {
    let result = await transactionService.getTotalPaidOwedTransactions(user);
    res.json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(403);
  }
  res.end();
};

exports.transactionSettle = async (req, res) => {
  const transaction = req.body;
  try {
    let result = await transactionService.transactionSettle(transaction);
    res.json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(403);
  }
  res.end();
};
