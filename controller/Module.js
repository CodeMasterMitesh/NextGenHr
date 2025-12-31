import Module from '../models/Module.js';
import Software from '../models/Software.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ModuleController {
  // Get all modules
  static async getAll(req, res) {
    try {
      const modules = await Module.find()
        .populate('softwareId', 'name')
        .sort({ softwareId: 1, order: 1 })
        .lean();

      res.json({
        success: true,
        data: modules
      });
    } catch (error) {
      console.error('Get all modules error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch modules',
        error: error.message
      });
    }
  }

  // Get modules by software ID
  static async getBySoftwareId(req, res) {
    try {
      const { softwareId } = req.params;
      const modules = await Module.find({ softwareId, isActive: true })
        .sort({ order: 1 })
        .lean();

      // Verify route exists for each module
      const validModules = await Promise.all(
        modules.map(async (mod) => {
          const routeExists = await this.verifyRouteExists(mod.route);
          return {
            ...mod,
            routeExists
          };
        })
      );

      res.json({
        success: true,
        data: validModules.filter(mod => mod.routeExists)
      });
    } catch (error) {
      console.error('Get modules by software error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch modules',
        error: error.message
      });
    }
  }

  // Get single module by ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const module = await Module.findById(id).populate('softwareId', 'name');

      if (!module) {
        return res.status(404).json({
          success: false,
          message: 'Module not found'
        });
      }

      res.json({
        success: true,
        data: module
      });
    } catch (error) {
      console.error('Get module by ID error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch module',
        error: error.message
      });
    }
  }

  // Create new module
  static async create(req, res) {
    try {
      const { name, icon, route, softwareId, order, isActive, description, permissions } = req.body;

      // Verify software exists
      const software = await Software.findById(softwareId);
      if (!software) {
        return res.status(404).json({
          success: false,
          message: 'Software not found'
        });
      }

      // Check if route already exists
      const existingRoute = await Module.findOne({ route });
      if (existingRoute) {
        return res.status(400).json({
          success: false,
          message: 'Route already exists'
        });
      }

      const module = new Module({
        name,
        icon: icon || 'bi-circle',
        route,
        softwareId,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
        description,
        permissions: permissions || [],
        createdBy: req.session?.userId
      });

      await module.save();

      res.status(201).json({
        success: true,
        message: 'Module created successfully',
        data: module
      });
    } catch (error) {
      console.error('Create module error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create module',
        error: error.message
      });
    }
  }

  // Update module
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, icon, route, softwareId, order, isActive, description, permissions } = req.body;

      // Verify software exists if softwareId is being updated
      if (softwareId) {
        const software = await Software.findById(softwareId);
        if (!software) {
          return res.status(404).json({
            success: false,
            message: 'Software not found'
          });
        }
      }

      // Check if route already exists (excluding current module)
      if (route) {
        const existingRoute = await Module.findOne({ route, _id: { $ne: id } });
        if (existingRoute) {
          return res.status(400).json({
            success: false,
            message: 'Route already exists'
          });
        }
      }

      const module = await Module.findByIdAndUpdate(
        id,
        {
          name,
          icon,
          route,
          softwareId,
          order,
          isActive,
          description,
          permissions,
          updatedBy: req.session?.userId
        },
        { new: true, runValidators: true }
      );

      if (!module) {
        return res.status(404).json({
          success: false,
          message: 'Module not found'
        });
      }

      res.json({
        success: true,
        message: 'Module updated successfully',
        data: module
      });
    } catch (error) {
      console.error('Update module error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update module',
        error: error.message
      });
    }
  }

  // Delete module
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const module = await Module.findByIdAndDelete(id);

      if (!module) {
        return res.status(404).json({
          success: false,
          message: 'Module not found'
        });
      }

      res.json({
        success: true,
        message: 'Module deleted successfully'
      });
    } catch (error) {
      console.error('Delete module error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete module',
        error: error.message
      });
    }
  }

  // Toggle module status
  static async toggleStatus(req, res) {
    try {
      const { id } = req.params;
      const module = await Module.findById(id);

      if (!module) {
        return res.status(404).json({
          success: false,
          message: 'Module not found'
        });
      }

      module.isActive = !module.isActive;
      module.updatedBy = req.session?.userId;
      await module.save();

      res.json({
        success: true,
        message: `Module ${module.isActive ? 'activated' : 'deactivated'} successfully`,
        data: module
      });
    } catch (error) {
      console.error('Toggle module status error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to toggle module status',
        error: error.message
      });
    }
  }

  // Verify if route file exists
  static async verifyRouteExists(route) {
    try {
      const viewsPath = path.join(__dirname, '../views');
      
      // Check common view patterns
      const possiblePaths = [
        path.join(viewsPath, `${route}.ejs`),
        path.join(viewsPath, route, 'list.ejs'),
        path.join(viewsPath, route, 'index.ejs')
      ];

      for (const filePath of possiblePaths) {
        if (fs.existsSync(filePath)) {
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error('Verify route error:', error);
      return false;
    }
  }
}

export default ModuleController;
