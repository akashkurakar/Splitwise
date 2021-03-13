const tranDb = require("../models/transactionmodel");
const ParticipantSerice = require("../services/participantservice");
const ActivityService = require("../services/ActivityService");
let activityService = new ActivityService();

const participantSerice = new ParticipantSerice();
class TransactionService {
  getTransactionByGroup = async (groupName) => {
    try {
      let transactions = await tranDb.getTransactionByGroup(groupName);
      return transactions;
    } catch (e) {
      console.log(e);
    }
  };
  getTransactionByUser = async (user) => {
    try {
      let transactions = await tranDb.getTransactionByUser(user);
      return transactions;
    } catch (e) {
      console.log(e);
    }
  };
  getOwedTransactionByUser = async (user) => {
    try {
      let transactions = await tranDb.getOwedTransactionByUser(user);
      return transactions;
    } catch (e) {
      console.log(e);
    }
  };
  getPaidTransactionByUser = async (user) => {
    try {
      let transactions = await tranDb.getPaidTransactionByUser(user);
      return transactions;
    } catch (e) {
      console.log(e);
    }
  };
  addTransaction = async (transaction) => {
    try {
      let users = await participantSerice.getParticipant(transaction.grpName);
      let transactions = await tranDb.addTransaction(
        users,
        transaction.grpName,
        transaction
      );
      return "Expenses added successfully!";
    } catch (e) {
      console.log(e);
      return "Something went wrong";
    }
  };
  getTotalPaidOwedTransactions = async (user) => {
    try {
      let oweData = await tranDb.getTotalPaidTransactionByUser(user);
      let owedData = await tranDb.getTotalOwedTransactionByUser(user);
      const data = {
        oweData: oweData,
        owedData: owedData,
      };
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  transactionSettle = async (transaction) => {
    try {
      let users = await tranDb.transactionSettle(transaction);
      activityService.addActivity(
        `${transaction.user2} paid you`,
        transaction.user1
      );
      activityService.addActivity(
        `You paid ${transaction.user1}`,
        transaction.user2
      );
      return "Transaction Settled";
    } catch (e) {
      console.log(e);
      return "Error in settling transaction";
    }
  };
}
module.exports = TransactionService;
