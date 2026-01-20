import Department from '../models/Department.js';

// Create new department
const storeDepartment = async (req, res) => {
    try {
        const department = await Department.create(req.body);
        res.status(200).json({ 
            message: 'Department created successfully', 
            success: true, 
            data: department 
        });
    } catch (err) {
        console.error('storeDepartment error:', err);
        res.status(500).json({ 
            message: err.message || 'Failed to create department', 
            success: false 
        });
    }
};

// Get all departments with pagination
const getDepartments = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const search = req.query.search || '';
        
        // Build search query
        const searchQuery = search ? {
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        } : {};
        
        const total = await Department.countDocuments(searchQuery);
        const departments = await Department.find(searchQuery)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
        
        res.status(200).json({
            success: true,
            data: departments,
            pagination: {
                total: total,
                page: page,
                limit: limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        console.error('getDepartments error:', err);
        res.status(500).json({ 
            message: 'Failed to fetch departments', 
            success: false 
        });
    }
};

// Get single department by ID
const getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id).lean();
        if (!department) {
            return res.status(404).json({ 
                message: 'Department not found', 
                success: false 
            });
        }
        res.status(200).json({ success: true, data: department });
    } catch (err) {
        console.error('getDepartmentById error:', err);
        res.status(500).json({ 
            message: 'Failed to fetch department', 
            success: false 
        });
    }
};

// Update department
const updateDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        
        if (!department) {
            return res.status(404).json({ 
                message: 'Department not found', 
                success: false 
            });
        }
        
        res.status(200).json({ 
            message: 'Department updated successfully', 
            success: true,
            data: department
        });
    } catch (err) {
        console.error('updateDepartment error:', err);
        res.status(500).json({ 
            message: 'Failed to update department', 
            success: false 
        });
    }
};

// Delete department
const deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndDelete(req.params.id);
        if (!department) {
            return res.status(404).json({ 
                message: 'Department not found', 
                success: false 
            });
        }
        res.status(200).json({ 
            message: 'Department deleted successfully', 
            success: true 
        });
    } catch (err) {
        console.error('deleteDepartment error:', err);
        res.status(500).json({ 
            message: 'Failed to delete department', 
            success: false 
        });
    }
};

export {
    storeDepartment,
    getDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
};