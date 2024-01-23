const express = require('express')
const router = express.Router()

// const { auth } = require('../middleware/auth.middleware')
const { validator, goods_id_validator, number_validator, selected_validator, ids_validator } = require('../middleware/cart.middleware')

const { add, findAll, update, remove, selectAll, unSelectAll, toggleSelectAll, count } = require('../controller/cart.controller')

// const router = new Router({
//   prefix: '/carts',
// })

// 加入购物车
router.post('/add', goods_id_validator(), add)

// 获取购物车列表
router.get('/list', findAll)

// 更新购物车
router.patch('/update/:id', number_validator(), selected_validator(), update)

// 删除商品
router.delete('/del/:id', ids_validator(), remove)

// 全选/取消全选
router.post('/selectAll', selectAll)
router.post('/unSelectAll', unSelectAll)
router.post('/toggleSelectAll', selected_validator(), toggleSelectAll)

// 购物车总数
router.get('/count', count)

module.exports = router
