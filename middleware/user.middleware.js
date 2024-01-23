const bcrypt = require('bcryptjs')
const { body } = require('express-validator')

const { getUserInfo } = require('../service/user.service')

const {
  userFormateError,
  userAlreadyExists,
  userRegisterError,
  userNotExistsError,
  userLoginError,
  userPasswordError,
  userOldPasswordEmptyError,
  userOldPasswordVerifyError,
  userNewPasswordEmptyError,
} = require('../errorType')

const user_name_validator = () => body('user_name').trim().notEmpty().isString()
const password_validator = () => body('password').trim().notEmpty().isString()
const user_validator = () =>
  user_name_validator().custom(async value => {
    const user = await getUserInfo({ user_name: value })
    if (user) throw new Error('username is already used')
  })

const bcryptPassword = async (req, res, next) => {
  console.log('req :>> ', req)
  const { password } = req.body

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(String(password), salt)

  req.body.password = hash
  await next()
}

const verifyLogin = async (req, res, next) => {
  const { user_name, password } = req.body
  let info = null
  try {
    info = await getUserInfo({ user_name })
    if (!info) {
      console.log('verifyLogin :>> ', { user_name })
      return res.send(userNotExistsError)
    }
    if (!bcrypt.compareSync(password, info.password)) {
      return res.send(userPasswordError)
    }
  } catch (error) {
    console.error('error :>> ', error)
    return res.send(userLoginError)
  }
  await next()
}

const verifyPassword = async (req, res, next) => {
  const { old_password, password } = req.body
  if (old_password === '') {
    return res.send(userOldPasswordEmptyError)
  }
  const { user_name } = req.user
  let info = null
  try {
    info = await getUserInfo({ user_name })
    if (!info) {
      return res.send(userNotExistsError)
    }
  } catch (error) {
    console.error('error :>> ', error)
    return res.send(userPasswordError)
  }
  if (!bcrypt.compareSync(old_password, info.password)) {
    return res.send(userOldPasswordVerifyError)
  }
  if (password === '') {
    return res.send(userNewPasswordEmptyError)
  }
  await next()
}

module.exports = {
  user_name_validator,
  password_validator,
  user_validator,
  bcryptPassword,
  verifyLogin,
  verifyPassword,
}
