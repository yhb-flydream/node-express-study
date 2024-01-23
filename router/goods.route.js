const express = require('express')
const router = express.Router()

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { validator, validatorArr } = require('../middleware/goods.middleware')

const { upload, create, update, remove, restore, findAll } = require('../controller/goods.controller')

// const router = new Router({
//   prefix: '/goods',
// })

// 上传图片
router.post('/upload', hadAdminPermission, upload)
// 添加商品
router.post('/create', hadAdminPermission, validatorArr(), create)
// 修改商品
router.put('/update/:id', hadAdminPermission, validatorArr(), update)
// 删除商品
router.delete('/remove/:id', hadAdminPermission, remove)
// 下架商品
router.post('/off/:id', hadAdminPermission, remove)
// 上架商品
router.post('/on/:id', hadAdminPermission, restore)
// 商品列表
router.get('/list', findAll)

module.exports = router
