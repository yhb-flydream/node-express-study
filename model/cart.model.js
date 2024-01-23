const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Goods = require('./goods.model')

const Carts = seq.define('zd_carts', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户 ID',
  },
  goods_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品 ID',
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '商品数量',
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '是否被选中，1：选中（默认），1：未选中',
  },
})

// 创建数据表
// Carts.sync({ force: true })
Carts.belongsTo(Goods, {
  foreignKey: 'goods_id',
  as: 'goods_info',
})

module.exports = Carts
