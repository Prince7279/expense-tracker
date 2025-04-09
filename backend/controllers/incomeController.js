const User = require("../models/User");
const Income = require("../models/Income");

// Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user._id;
    try{
        const  { icon, source, amount } = req.body;
        // validation check for missing fields 
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });
        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        // console.error(error); 
        res.status(500).json({ message: "Server error" });
    }
}

// Get All Income Source
exports.getAllIncome = async (req, res) => {} // ✅ fixed name here

// Delete Income Source
exports.deleteIncome = async (req, res) => {}

// Download Excel
exports.downloadIncomeExcel = async (req, res) => {}
