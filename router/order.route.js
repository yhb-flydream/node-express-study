const express = require('express')
const router = express.Router()

// const { auth } = require('../middleware/auth.middleware')
const { validator, address_id_validator, goods_info_validator, total_validator, status_validator } = require('../middleware/order.middleware')

const { create, findAll, update } = require('../controller/order.controller')

// const router = new Router({
//   prefix: '/orders',
// })

// 生成订单
router.post('/create', address_id_validator(), goods_info_validator(), total_validator(), create)
// 订单列表
router.get('/list', findAll)
// 更新订单
router.patch('/update/:id', status_validator(), update)

module.exports = router
