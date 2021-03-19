const tranDb = require("../models/transactionmodel");
const ParticipantSerice = require("../services/participantservice");
const ActivityService = require("../services/ActivityService");
const user = require("../models/usermodel");
const transaction = require("../models/transactionmodel");
let activityService = new ActivityService();
const UserService = require("./UserService");
let userService = new UserService();

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

  getGroupBalances = async (transacion) => {
    try {
      let users = await participantSerice.getParticipant(transacion.grp_id);
      let data = [];
      for (let user of users) {
        let owedList = await tranDb.userGroupBalanceOwed(
          transacion.grp_id,
          user.user_name
        );
        let oweList = await tranDb.userGroupBalancePaid(
          transacion.grp_id,
          user.user_name
        );
        let sum = 0;
        if (oweList[0].total != null) {
          sum = sum + oweList[0].total;
        }
        if (owedList[0].total != null) {
          sum = sum - owedList[0].total;
        }
        data.push({ user: user.user_name, total: sum });
      }
      return data;
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
      let users = await participantSerice.getParticipant(transaction.grpId);
      let transactions = await tranDb.addTransaction(
        users,
        transaction.grpId,
        transaction
      );
      if (transactions !== "No more users are there in group") {
        for (let user of users) {
          if (user.user_name !== transaction.user) {
            let owner = await userService.getUserById(transaction.user);
            activityService.addActivity(
              `${owner.name} added expense as ${transaction.description} in ${transaction.grpName}`,
              user.user_name,
              transaction.grpId
            );
          } else {
            activityService.addActivity(
              `You paid for ${transaction.description} in ${transaction.grpName}`,
              user.user_name,
              transaction.grpId
            );
          }
        }
        return "Expenses added successfully!";
      } else {
        return "Expenses added successfully!";
      }
    } catch (e) {
      console.log(e);
      return e;
    }
  };
  getTotalPaidOwedTransactions = async (user) => {
    try {
      let oweData = await tranDb.getTotalPaidTransactionByUser(user);
      let owedData = await tranDb.getTotalOwedTransactionByUser(user);
      let owedList = await tranDb.getTotalOwedTransactionByUserInGroup(user);
      let oweList = await tranDb.getTotalOweTransactionByUserInGroup(user);
      const data = {
        oweData: oweData,
        owedData: owedData,
        owedList: owedList,
        oweList: oweList,
      };
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  transactionSettle = async (transaction) => {
    try {
      let users = await tranDb.transactionSettle(transaction);
      let user1 = await userService.getUserById(transaction.user1);
      let user2 = await userService.getUserById(transaction.user2);
      activityService.addActivity(
        `${user2} settled up with you`,
        transaction.user1,
        ""
      );
      activityService.addActivity(`You paid ${user1}`, transaction.user2, "");
      return "Transaction Settled";
    } catch (e) {
      console.log(e);
      return "Error in settling transaction";
    }
  };
}
module.exports = TransactionService;
