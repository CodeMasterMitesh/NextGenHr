import Software from '../models/Software.js';
import Module from '../models/Module.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SoftwareController {
  // Get all software with their modules
  static async getAll(req, res) {
    try {
      const software = await Software.find({ isActive: true })
        .sort({ order: 1 })
        .lean();

      const softwareWithModules = await Promise.all(
        software.map(async (soft) => {
          const modules = await Module.find({ 
            softwareId: soft._id, 
            isActive: true 
          })
          .sort({ order: 1 })
          .lean();

          // Verify route exists
          const routeExists = await SoftwareController.verifyRouteExists(soft.route);
          
          // Filter modules with existing routes
          const validModules = await Promise.all(
            modules.map(async (mod) => {
              const modRouteExists = await SoftwareController.verifyRouteExists(mod.route);
              return modRouteExists ? mod : null;
            })
          );

          return {
            ...soft,
            routeExists,
            modules: validModules.filter(Boolean)
          };
        })
      );

      // Filter only software with valid routes or valid modules
      const validSoftware = softwareWithModules.filter(
        soft => soft.routeExists || soft.modules.length > 0
      );

      res.json({
        success: true,
        data: validSoftware
      });
    } catch (error) {
      console.error('Get all software error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch software',
        error: error.message
      });
    }
  }

  // Get all software for management (includes inactive)
  static async getAllForManagement(req, res) {
    try {
      const software = await Software.find()
        .sort({ order: 1 })
        .lean();

      res.json({
        success: true,
        data: software
      });
    } catch (error) {
      console.error('Get all software error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch software',
        error: error.message
      });
    }
  }

  // Get single software by ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const software = await Software.findById(id);

      if (!software) {
        return res.status(404).json({
          success: false,
          message: 'Software not found'
        });
      }

      res.json({
        success: true,
        data: software
      });
    } catch (error) {
      console.error('Get software by ID error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch software',
        error: error.message
      });
    }
  }

  // Create new software
  static async create(req, res) {
    try {
      const { name, icon, route, order, isActive, description, permissions } = req.body;

      // Check if route already exists
      const existingRoute = await Software.findOne({ route });
      if (existingRoute) {
        return res.status(400).json({
          success: false,
          message: 'Route already exists'
        });
      }

      const software = new Software({
        name,
        icon: icon || 'bi-box',
        route,
        order: order || 0,
        isActive: isActive !== undefined ? isActive : true,
        description,
        permissions: permissions || [],
        createdBy: req.session?.userId
      });

      await software.save();

      res.status(201).json({
        success: true,
        message: 'Software created successfully',
        data: software
      });
    } catch (error) {
      console.error('Create software error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create software',
        error: error.message
      });
    }
  }

  // Update software
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, icon, route, order, isActive, description, permissions } = req.body;

      // Check if route already exists (excluding current software)
      if (route) {
        const existingRoute = await Software.findOne({ route, _id: { $ne: id } });
        if (existingRoute) {
          return res.status(400).json({
            success: false,
            message: 'Route already exists'
          });
        }
      }

      const software = await Software.findByIdAndUpdate(
        id,
        {
          name,
          icon,
          route,
          order,
          isActive,
          description,
          permissions,
          updatedBy: req.session?.userId
        },
        { new: true, runValidators: true }
      );

      if (!software) {
        return res.status(404).json({
          success: false,
          message: 'Software not found'
        });
      }

      res.json({
        success: true,
        message: 'Software updated successfully',
        data: software
      });
    } catch (error) {
      console.error('Update software error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update software',
        error: error.message
      });
    }
  }

  // Delete software
  static async delete(req, res) {
    try {
      const { id } = req.params;

      // Check if software has modules
      const moduleCount = await Module.countDocuments({ softwareId: id });
      if (moduleCount > 0) {
        return res.status(400).json({
          success: false,
          message: `Cannot delete software with ${moduleCount} module(s). Please delete modules first.`
        });
      }

      const software = await Software.findByIdAndDelete(id);

      if (!software) {
        return res.status(404).json({
          success: false,
          message: 'Software not found'
        });
      }

      res.json({
        success: true,
        message: 'Software deleted successfully'
      });
    } catch (error) {
      console.error('Delete software error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete software',
        error: error.message
      });
    }
  }

  // Toggle software status
  static async toggleStatus(req, res) {
    try {
      const { id } = req.params;
      const software = await Software.findById(id);

      if (!software) {
        return res.status(404).json({
          success: false,
          message: 'Software not found'
        });
      }

      software.isActive = !software.isActive;
      software.updatedBy = req.session?.userId;
      await software.save();

      res.json({
        success: true,
        message: `Software ${software.isActive ? 'activated' : 'deactivated'} successfully`,
        data: software
      });
    } catch (error) {
      console.error('Toggle software status error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to toggle software status',
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

export default SoftwareController;
