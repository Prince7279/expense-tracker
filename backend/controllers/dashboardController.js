const Income = require("../models/Income");
const Expense = require("../models/Expense");
const {isValidObjectId,Types} = require("mongoose");


//  Dashboard Data 
exports.getDashboardData = async (req, res) => {

    try{
        const userId = req.user.id;
        const userObjectId =new Types.ObjectId(String(userId)); // Convert userId to ObjectId 

        // fetch total income and expense
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        console.log(totalIncome, {totalIncome, userId :isValidObjectId(userId)});

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]); 

        // get income transactions in last 60 days
        const last60DaysIncomeTransactions = await Income.find({

        
         userId,
         date :{ $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)},
    }).sort ({ date: -1 });
    // get total income in last 60 days
    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
        (sum, transaction) => sum + transaction.amount, 
        0
    )

    // get expense transactions in last 30 days

    const last30DaysExpenseTransactions = await Expense.find({
        userId,
        date :{ $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}, 

    }).sort ({ date: -1 });

    // get total expense in last 30 days
    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
        (sum, transaction) => sum + transaction.amount, 
        0
    );

    // fetch last 5 income transactions
    const lastTransaction = [
        ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
            (txn) =>({
                ...txn.toObject(),
                type: "income",

            })
        ),
        ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
            (txn) =>({
                ...txn.toObject(),
                type: "expense",
            })
        ),
    ].sort((a, b) => b.date - a.date);
    // send response
     res.json({
        totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
        totalIncome: totalIncome[0]?.total || 0,
        totalExpense: totalExpense[0]?.total || 0,
        last30DaysExpenseTransactions:{
            total: expenseLast30Days,
            transactions: last30DaysExpenseTransactions,
        },
        last60DaysIncomeTransactions:{
            total: incomeLast60Days,
            transactions: last60DaysIncomeTransactions,
        },
        recentTransaction:lastTransaction,
         })
    } catch (error) {
        res.status(500).json({ message: "Server error",error });
    }


}