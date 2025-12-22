import User from "../models/User.js";

const storeEmployee = async (req, res) => {
    try {
        await User.create(req.body);
        res.status(200).json({ message: 'Employee stored successfully', success: true });
    } catch (err) {
        console.error('storeEmployee error:', err);
        res.status(500).json({ message: 'Failed to store employee', success: false });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await User.find({});
        res.status(200).json(employees);
    } catch (err) {
        console.error('getEmployees error:', err);
        res.status(500).json({ message: 'Failed to fetch employees' });
    }
};

const getEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await User.findById(employeeId);
        res.status(200).json(employee);
    } catch (err) {
        console.error('getEmployee error:', err);
        res.status(500).json({ message: 'Failed to fetch employee' });
    }
};

const getLastEmployees = async (req, res) => {
    try {
        const employees = await User.find({}).sort({ _id: -1 }).limit(1);
        res.status(200).json(employees);
    } catch (err) {
        console.error('getLastEmployees error:', err);
        res.status(500).json({ message: 'Failed to fetch last employee' });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const payload = req.body;
        await User.findByIdAndUpdate(employeeId, payload, { new: true });
        res.status(200).json({ message: 'Employee updated successfully', success: true });
    } catch (err) {
        console.error('updateEmployee error:', err);
        res.status(500).json({ message: 'Failed to update employee', success: false });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        await User.findByIdAndDelete(employeeId);
        res.status(200).json({ message: 'Employee deleted successfully', success: true });
    } catch (err) {
        console.error('deleteEmployee error:', err);
        res.status(500).json({ message: 'Failed to delete employee', success: false });
    }
};

export { storeEmployee, getEmployees, getEmployee, getLastEmployees, updateEmployee, deleteEmployee };