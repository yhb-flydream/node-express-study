const express = require('express')
const router = express.Router()

// const { auth } = require('../middleware/auth.middleware')
const { user_name_validator, password_validator, user_validator, bcryptPassword, verifyLogin, verifyPassword } = require('../middleware/user.middleware')

const { register, login, logout, changePassword } = require('../controller/user.controller')

// const router = new Router({
//   prefix: '/users',
// })

// 注册
router.post('/register', user_name_validator(), password_validator(), user_validator(), bcryptPassword, register)
// 登录
router.post('/login', user_validator(), verifyLogin, login)
// 修改密码
router.patch('/changePassword', verifyPassword, bcryptPassword, changePassword)
// 退出
router.get('/logout', logout)

module.exports = router
