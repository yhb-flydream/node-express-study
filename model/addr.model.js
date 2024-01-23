const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Addr = seq.define('zd_addresses', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户 ID',
  },
  consignee: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收件人',
  },
  phone: {
    type: DataTypes.CHAR(11),
    allowNull: false,
    comment: '手机号',
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '地址',
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否为默认地址，0：不是（默认），1：是',
  },
})
// 创建数据表
// Addr.sync({ force: true })

module.exports = Addr
