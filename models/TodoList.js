module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('TodoList',{
    task: {
      type: DataTypes.STRING(255)
    }
  },{
    tableName: 'todolists',
    timestamp: false
  })
  model.assocaite = models => {
    model.belongsTo(models.User, {foreignKey: 'user_id'})
  }
  return model
}