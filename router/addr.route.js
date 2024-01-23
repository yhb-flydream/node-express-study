const express = require('express')
const router = express.Router()

// const { auth } = require('../middleware/auth.middleware')
const { validator, consignee_validator, id_validator, phone_validator, address_validator } = require('../middleware/addr.middleware')

const { create, findAll, update, remove, setDefault } = require('../controller/addr.controller')

// const router = new Router({
//   prefix: '/address',
// })

// 添加地址
router.post('/add', consignee_validator(), create)

// 地址列表
router.get('/list', findAll)

// 更新地址
router.put('/update/:id', id_validator(), consignee_validator(), phone_validator(), address_validator(), update)

// 删除地址
router.delete('/del/:id', id_validator(), remove)

// 设置默认地址
router.patch('/default/:id', id_validator(), setDefault)

module.exports = router
