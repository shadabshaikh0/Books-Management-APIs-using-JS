'use strict'
const Sequelize = require('sequelize')

// Look out for alternatives to inject in the model along with the associations
const mixin = {
  commonAttributes: {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      autoIncrement: false
    },
    createdBy: {
      type: Sequelize.UUID
    },
    updatedBy: {
      type: Sequelize.UUID
    }
  },
  associations (model, userModel) {
    model.belongsTo(userModel.user, {
      foreignKey: 'created_by',
      targetKey: 'id',
      as: 'created_by_user'
    })
    model.belongsTo(userModel.user, {
      foreignKey: 'updated_by',
      targetKey: 'id',
      as: 'updated_by_user'
    })
    return model
  }
}

module.exports = mixin
