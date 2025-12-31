import mongoose from 'mongoose';
import Software from './models/Software.js';
import Module from './models/Module.js';
import connectDB from './db.js';

const menuData = [
    {
        software: {
            name: 'HR Management',
            icon: 'bi-people-fill',
            route: '',
            order: 1,
            isActive: true
        },
        modules: [
            { name: 'Employees', icon: 'bi-person', route: 'employees', order: 1 },
            { name: 'Departments', icon: 'bi-diagram-3', route: 'departments', order: 2 },
            { name: 'Designations', icon: 'bi-diagram-2', route: 'designations', order: 3 },
            { name: 'Branches', icon: 'bi-geo-alt', route: 'branches', order: 4 },
            { name: 'Company', icon: 'bi-building', route: 'company', order: 5 }
        ]
    },
    {
        software: {
            name: 'Attendance & Leave',
            icon: 'bi-calendar-check',
            route: '',
            order: 2,
            isActive: true
        },
        modules: [
            { name: 'Attendance', icon: 'bi-clock-history', route: 'attendance', order: 1 },
            { name: 'Leave Requests', icon: 'bi-calendar-check', route: 'leave-requests', order: 2 },
            { name: 'Leaves', icon: 'bi-calendar2', route: 'leaves', order: 3 }
        ]
    },
    {
        software: {
            name: 'Payroll',
            icon: 'bi-cash-stack',
            route: '',
            order: 3,
            isActive: true
        },
        modules: [
            { name: 'Payroll', icon: 'bi-cash-stack', route: 'payroll', order: 1 },
            { name: 'Payslips', icon: 'bi-receipt', route: 'payslips', order: 2 },
            { name: 'Salary', icon: 'bi-cash-coin', route: 'salary', order: 3 },
            { name: 'Shift Management', icon: 'bi-clock', route: 'shift-management', order: 4 },
            { name: 'Weekoff', icon: 'bi-calendar-x', route: 'weekoff', order: 5 },
            { name: 'Earnings & Deductions', icon: 'bi-arrow-left-right', route: 'earnings-deductions', order: 6 }
        ]
    },
    {
        software: {
            name: 'Recruitment',
            icon: 'bi-file-earmark-person',
            route: '',
            order: 4,
            isActive: true
        },
        modules: [
            { name: 'Job Requisition', icon: 'bi-file-earmark-plus', route: 'job-requisition', order: 1 },
            { name: 'Job Posting', icon: 'bi-megaphone', route: 'job-posting', order: 2 },
            { name: 'Applications', icon: 'bi-file-earmark-person', route: 'job-applications', order: 3 },
            { name: 'Resumes', icon: 'bi-file-earmark-pdf', route: 'resumes', order: 4 },
            { name: 'Interviews', icon: 'bi-calendar-event', route: 'interview-schedule', order: 5 },
            { name: 'Onboarding', icon: 'bi-person-check', route: 'onboarding', order: 6 },
            { name: 'Training', icon: 'bi-book', route: 'training-schedule', order: 7 }
        ]
    },
    {
        software: {
            name: 'Performance & Development',
            icon: 'bi-star',
            route: '',
            order: 5,
            isActive: true
        },
        modules: [
            { name: 'Performance Reviews', icon: 'bi-star', route: 'performance-reviews', order: 1 },
            { name: 'Exams', icon: 'bi-clipboard-check', route: 'exam', order: 2 }
        ]
    },
    {
        software: {
            name: 'Asset Management',
            icon: 'bi-box2',
            route: '',
            order: 6,
            isActive: true
        },
        modules: [
            { name: 'Issue', icon: 'bi-box2-heart', route: 'asset-issue', order: 1 },
            { name: 'Return', icon: 'bi-box2-arrow-in', route: 'asset-return', order: 2 }
        ]
    },
    {
        software: {
            name: 'Tasks & Events',
            icon: 'bi-list-check',
            route: '',
            order: 7,
            isActive: true
        },
        modules: [
            { name: 'Task Management', icon: 'bi-list-check', route: 'tasks', order: 1 },
            { name: 'Events', icon: 'bi-calendar2-event', route: 'events', order: 2 }
        ]
    },
    {
        software: {
            name: 'Administration',
            icon: 'bi-gear',
            route: '',
            order: 8,
            isActive: true
        },
        modules: [
            { name: 'Users', icon: 'bi-person-gear', route: 'users', order: 1 },
            { name: 'Roles & Permissions', icon: 'bi-shield-lock', route: 'roles', order: 2 },
            { name: 'Audit Logs', icon: 'bi-file-earmark-text', route: 'audit-logs', order: 3 },
            { name: 'Approvals', icon: 'bi-check2-square', route: 'approvals', order: 4 }
        ]
    },
    {
        software: {
            name: 'Common',
            icon: 'bi-newspaper',
            route: '',
            order: 9,
            isActive: true
        },
        modules: [
            { name: 'News & Articles', icon: 'bi-newspaper', route: 'news', order: 1 },
            { name: 'Notifications', icon: 'bi-bell', route: 'notifications', order: 2 },
            { name: 'Holidays', icon: 'bi-calendar-heart', route: 'holidays', order: 3 }
        ]
    }
];

async function seedMenus() {
    try {
        console.log('🔌 Connecting to database...');
        console.log('DB URL:', process.env.DB_URL);
        console.log('DB Name:', process.env.DB_NAME);
        
        await connectDB();
        console.log('✅ Database connected');
        console.log('Connection state:', mongoose.connection.readyState);

        // Clear existing data
        console.log('🗑️  Clearing existing menu data...');
        await Module.deleteMany({});
        await Software.deleteMany({});
        console.log('✅ Existing data cleared');

        console.log('📝 Seeding menu data...');
        
        for (const item of menuData) {
            // Create software (parent menu)
            const software = await Software.create(item.software);
            console.log(`   ✓ Created software: ${software.name}`);

            // Create modules (submenus)
            if (item.modules && item.modules.length > 0) {
                for (const moduleData of item.modules) {
                    const module = await Module.create({
                        ...moduleData,
                        softwareId: software._id
                    });
                    console.log(`      ✓ Created module: ${module.name}`);
                }
            }
        }

        console.log('\n✨ Menu seeding completed successfully!');
        console.log(`📊 Created ${menuData.length} software menus with their modules`);
        
        // Display summary
        const softwareCount = await Software.countDocuments();
        const moduleCount = await Module.countDocuments();
        console.log(`\n📈 Summary:`);
        console.log(`   - Software (Parent Menus): ${softwareCount}`);
        console.log(`   - Modules (Submenus): ${moduleCount}`);
        
        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding menus:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
}

// Run if executed directly
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.argv[1] === __filename) {
    seedMenus();
}

export default seedMenus;
