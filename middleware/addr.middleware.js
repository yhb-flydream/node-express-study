const { body, param } = require('express-validator')

const { addrFormatError } = require('../errorType')

const validator = rule => async (ctx, next) => {
  try {
    await ctx.verifyParams(rule)
  } catch (error) {
    return ctx.app.emit('error', { ...addrFormatError, data: error }, ctx)
  }
  await next()
}

const consignee_validator = () => body('consignee').trim().notEmpty().isString()
const id_validator = () => param('id').trim().notEmpty().isString()
const phone_validator = () => body('phone').trim().isMobilePhone()
const address_validator = () => body('address').trim().notEmpty().isString()


module.exports = {
  validator,
  consignee_validator,
  id_validator,
  phone_validator,
  address_validator,
}
