const { body } = require('express-validator')

const { cartsFormatError } = require('../errorType')

const validator = rule => async (ctx, next) => {
  try {
    await ctx.verifyParams(rule)
  } catch (error) {
    cartsFormatError.data = error
    return ctx.app.emit('error', cartsFormatError, ctx)
  }
  await next()
}

const goods_id_validator = () => body('goods_id').trim().notEmpty().isString()
const number_validator = () => body('number').trim().notEmpty().isNumeric()
const selected_validator = () => body('selected').trim().notEmpty().isBoolean()
const ids_validator = () => body('ids').isArray()

module.exports = {
  validator,
  goods_id_validator,
  number_validator,
  selected_validator,
  ids_validator,
}
