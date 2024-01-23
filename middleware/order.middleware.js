const { body } = require('express-validator')

const { orderFormatError } = require('../errorType')

const validator = rule => async (ctx, next) => {
  try {
    await ctx.verifyParams(rule)
  } catch (error) {
    return ctx.app.emit('error', { ...orderFormatError, data: error }, ctx)
  }
  await next()
}

const address_id_validator = () => body('address_id').trim().notEmpty().isString()
const goods_info_validator = () => body('goods_info').trim().notEmpty().isString()
const total_validator = () => body('total').trim().notEmpty().isString()
const status_validator = () => body('status').trim().notEmpty().isNumeric()

module.exports = {
  validator,
  address_id_validator,
  goods_info_validator,
  total_validator,
  status_validator,
}
