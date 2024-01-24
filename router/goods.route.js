const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  // 目录
  destination: (req, file, cb) => {
    try {
      fs.mkdirSync(path.join(process.cwd(), 'uploads'))
    } catch (e) {}
    cb(null, path.join(process.cwd(), 'uploads'))
  },
  // 文件名
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const multerUpload = multer({ storage })

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { validator, validatorArr } = require('../middleware/goods.middleware')

const { upload, create, update, remove, restore, findAll } = require('../controller/goods.controller')

// const router = new Router({
//   prefix: '/goods',
// })

// 上传图片
// multerUpload.single 单文件上传
// multerUpload.array 多文件上传
router.post('/upload', hadAdminPermission, multerUpload.single('file'), upload)
// router.post('/upload', hadAdminPermission, multerUpload.array('file'), upload)
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
