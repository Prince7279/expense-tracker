const xlsx = require("xlsx");
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
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try{
        const income = await Income.find({userId}).sort({date: -1});
        res.json(income);
    }
    catch (error) {
        // console.error(error); 
        res.status(500).json({ message: "Server error" });
    }
} // ✅ fixed name here

// Delete Income Source
exports.deleteIncome = async (req, res) => {
     
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.json ({ message: "Income deleted successfully" });
    } catch (error) {
        // console.error(error); 
        res.status(500).json({ message: "Server error" });
    }
}

// Download Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try{
        const income = await Income.find({userId}).sort({date: -1});

        // prepare data for Excel
        const data  = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "Income.xlsx");
        res.download("income_details.xlsx");

    } catch (error) {
        // console.error(error); 
        res.status(500).json({ message: "Server error" });
    }                                               
}
