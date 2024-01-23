const jwt = require('jsonwebtoken')

const { createUser, getUserInfo, updateUserInfo } = require('../service/user.service')
const { userRegisterError, userLoginError, userPatchPasswordError } = require('../errorType')
const { JWT_SECRET } = require('../config/')

class UserController {
  async register(req, res) {
    // console.log('req.body :>> ', req.body)
    const { user_name, password } = req.body

    try {
      const result = await createUser(user_name, password)
      res.json({
        code: 0,
        msg: 'success',
        data: {
          id: result.id,
          user_name: result.user_name,
        },
      })
    } catch (error) {
      console.error('error :>> ', error)
      return res.json(userRegisterError)
    }
  }
  async login(req, res) {
    const { user_name } = req.body
    try {
      const { password, ...info } = await getUserInfo({ user_name })
      res.json({
        code: 0,
        msg: 'success',
        data: {
          token: jwt.sign(info, JWT_SECRET, { expiresIn: '1d' }),
        },
      })
    } catch (error) {
      console.error('error :>> ', error)
      return res.json(userLoginError)
    }
  }

  async changePassword(req, res) {
    const { id } = req.user
    const { password } = req.body
    try {
      const result = await updateUserInfo({ id, password })
      if (result) {
        res.json({
          code: 0,
          msg: 'success',
          data: '',
        })
      } else {
        res.json(userPatchPasswordError)
      }
    } catch (error) {
      res.json(userPatchPasswordError)
    }
  }
  async logout(req, res) {
    res.json('logout')
  }
}

module.exports = new UserController()
