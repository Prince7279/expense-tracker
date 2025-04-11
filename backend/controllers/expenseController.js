const xlsx = require("xlsx");
const Expense = require("../models/Expense");

// Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user._id;
    try{
        const  { icon, category, amount } = req.body;
        // validation check for missing fields 
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });
        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        // console.error(error); 
        res.status(500).json({ message: "Server error" });
    }
}

// Get All Expense Source
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try{
        const expense = await Expense.find({userId}).sort({date: -1});
        res.json(expense);
    }
    catch (error) {
        // console.error(error); 
        res.status(500).json({ message: "Server error" });
    }
} // ✅ fixed name here

// Delete Expense Source
exports.deleteExpense = async (req, res) => {
     
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json ({ message: "Expense deleted successfully" });
    } catch (error) {
        // console.error(error); 
        res.status(500).json({ message: "Server error" });
    }
}

// Download Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try{
        const Expense = await Expense.find({userId}).sort({date: -1});

        // prepare data for Excel
        const data  = expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "expense");
        xlsx.writeFile(wb, "expense.xlsx");
        res.download("expense_details.xlsx");

    } catch (error) {
        // console.error(error); 
        res.status(500).json({ message: "Server error" });
    }                                               
}
