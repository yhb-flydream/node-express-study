const path = require('path')

const { fileUploadError, goodsCreateError, goodsIdError, goodsUpdateError, goodsRemoveError, goodsRestoreError } = require('../errorType')
const { createGoods, updateGoods, removeGoods, restoreGoods, findGoods } = require('../service/goods.service')

class GoodsController {
  async upload(req, res) {
    const { file } = req.files
    if (file) {
      res.json({
        code: 0,
        msg: 'success',
        data: {
          url: file.newFilename,
        },
      })
    } else {
      res.json(fileUploadError)
    }
  }
  async create(req, res) {
    try {
      const { createdAt, updatedAt, ...res } = await createGoods(req.body)
      res.json({
        code: 0,
        msg: 'success',
        data: res,
      })
    } catch (error) {
      res.json(goodsCreateError)
    }
  }
  async update(req, res) {
    try {
      const result = await updateGoods({ ...req.body, id: req.params.id })
      if (result) {
        res.json({
          code: 0,
          msg: 'success',
          data: '',
        })
      } else {
        res.json(goodsIdError)
      }
    } catch (error) {
      res.json(goodsUpdateError)
    }
  }
  async remove(req, res) {
    try {
      const result = await removeGoods(req.params.id)
      if (result) {
        res.json({
          code: 0,
          msg: 'success',
          data: '',
        })
      } else {
        res.json(goodsIdError)
      }
    } catch (error) {
      res.json(goodsRemoveError)
    }
  }
  async restore(req, res) {
    try {
      const result = await restoreGoods(+req.params.id)
      if (result) {
        res.json({
          code: 0,
          msg: 'success',
          data: '',
        })
      } else {
        res.json(goodsIdError)
      }
    } catch (error) {
      res.json(goodsRestoreError)
    }
  }
  async findAll(req, res) {
    const { pageNum = 1, pageSize = 10 } = req.query
    const result = await findGoods(pageNum, pageSize)
    res.json({
      code: 0,
      msg: 'success',
      data: result,
    })
  }
}

module.exports = new GoodsController()
