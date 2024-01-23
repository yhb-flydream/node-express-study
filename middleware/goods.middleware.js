const { body } = require('express-validator')

const { goodsFormatError } = require('../errorType')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_name: { type: 'string', required: true },
      goods_price: { type: 'number', required: true },
      goods_num: { type: 'number', required: true },
      goods_img: { type: 'string', required: true },
    })
  } catch (error) {
    console.log('error :>> ', error)
    goodsFormatError.data = error
    return ctx.app.emit('error', goodsFormatError, ctx)
  }
  await next()
}

const goods_name_validator = () => body('goods_name').trim().notEmpty().isString()
const goods_price_validator = () => body('goods_price').trim().notEmpty().isNumeric()
const goods_num_validator = () => body('goods_num').trim().notEmpty().isNumeric()
const goods_img_validator = () => body('goods_img').trim().notEmpty().isString()

const validatorArr = () => [goods_name_validator(), goods_price_validator(), goods_img_validator(), goods_img_validator()]

module.exports = {
  validator,
  goods_name_validator,
  goods_price_validator,
  goods_num_validator,
  goods_img_validator,
  validatorArr,
}
