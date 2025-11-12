const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  module: { type: String, required: true },
  actions: [String]
});

module.exports = mongoose.model('Permission', permissionSchema);
