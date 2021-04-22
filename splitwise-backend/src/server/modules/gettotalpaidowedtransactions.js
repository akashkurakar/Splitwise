const Transaction = require("../models/transactionmodel");

async function handle_request(msg, callback) {
  try {
    const owedAmount = await Transaction.aggregate([
      { $match: { owed_name: msg, status: "PENDING" } },
      {
        $group: {
          _id: { paid_by: "$paid_by" },
          /* grp_id: {
            $addToSet: { grp_id: "$grp_id", amount: "$amount" },
          },
*/
          total_amt: { $sum: "$amount" },
        },
      },
    ]);
    const paidAmount = await Transaction.aggregate([
      { $match: { paid_by: msg, status: "PENDING" } },
      {
        /* $group: {
          _id: "$paid_by",
          owed_name: { $first: "$owed_name" },
          paid_by: { $first: "$paid_by" },
          grp_id: { $first: "$grp_id" },
          total_amt: { $sum: "$amount" },
        }, */
        $group: {
          _id: { owed_name: "$owed_name" },
          /* grp_id: {
            $addToSet: { grp_id: "$grp_id", amount: "$amount" },
          },*/
          total_amt: { $sum: "$amount" },
        },
      },
    ]);
    const paidAmoutninGroup = await Transaction.aggregate([
      { $match: { paid_by: msg, status: "PENDING" } },
      {
        $group: {
          _id: {
            owed_name: "$owed_name",
            grp_id: "$grp_id",
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $group: {
          _id: "$_id.owed_name",
          grps: {
            $push: {
              grp: "$_id.grp_id",
              total: "$total",
            },
          },
          total_amt: { $sum: "$total" },
        },
      },
      /*{
      $group: {
          _id: "$paid_by",
          owed_name: { $first: "$owed_name" },
          paid_by: { $first: "$paid_by" },
          grp_id: { $first: "$grp_id" },
          total_amt: { $sum: "$amount" },
        },*/

      /*$group: {
          _id: { owed_name: "$owed_name" },
          grp_id: {
            $addToSet: { grp_id: "$grp_id" },
          },
          total_amt: { $sum: "$amount" },
        },
      },
      { $match: { owed_name: "$_id.owed_name" } },
      {
        $group: {
          _id: { grp_id: "$grp_id" },
          grp_amt: { $sum: "$amount" },
        },
      }, */
    ]);
    const owedAmoutninGroup = await Transaction.aggregate([
      { $match: { owed_name: msg, status: "PENDING" } },
      /*{
         $group: {
          _id: "$owed_name",
          paid_by: { $first: "$paid_by" },
          owed_name: { $first: "$owed_name" },
          grp_id: { $first: "$grp_id" },
          total_amt: { $sum: "$amount" },
        },*/
      {
        $group: {
          _id: {
            paid_by: "$paid_by",
            grp_id: "$grp_id",
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $group: {
          _id: "$_id.paid_by",
          grps: {
            $push: {
              grp: "$_id.grp_id",
              total: "$total",
            },
          },
          total_amt: { $sum: "$total" },
        },
      },
      /* $group: {
          _id: { paid_by: "$paid_by" },
          grp_id: {
            $addToSet: { grp_id: "$grp_id" },
          },
          total_amt: { $sum: "$amount" },
        },
        
    {$group:
        {
            _id:"$_id.paid_by",
            tipos:
            {
                $push:
                {
                    tipo:"$_id.tipo",
                    total:"$total"
                }
            },
            totalGeneral:{$sum:"$total"}

        }

    }
      },*/
    ]);
    const data = {
      oweData: paidAmount,
      owedData: owedAmount,
      oweList: paidAmoutninGroup,
      owedList: owedAmoutninGroup,
    };
    return callback(null, data);
  } catch (e) {
    console.log(e);
    return callback("Error", "Something went wrong");
  }
}
exports.handle_request = handle_request;
