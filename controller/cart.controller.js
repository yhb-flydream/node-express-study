const {
  createOrUpdate,
  findCarts,
  updateCarts,
  removeCarts,
  selectAllCarts,
  unSelectAllCarts,
  toggleSelectAllCarts,
  cartsCount,
} = require('../service/cart.service')

const { cartsFormatError } = require('../errorType')

class CartsController {
  async add(req, res) {
    const { id: user_id } = req.user
    const { goods_id } = req.body

    try {
      const result = await createOrUpdate(user_id, goods_id)
      res.json({
        code: 0,
        msg: 'success',
        data: result,
      })
    } catch (error) {}
  }
  async findAll(req, res) {
    const { pageNum = 1, pageSize = 10 } = req.query
    const result = await findCarts(pageNum, pageSize)
    res.json({
      code: 0,
      msg: 'success',
      data: result,
    })
  }
  async update(req, res) {
    const { id } = req.params
    const { number, selected } = req.body
    if (number === undefined && selected === undefined) {
      let msg = 'number 和 selected 不能同时为空'
      return res.json({ ...cartsFormatError, message })
    }
    const result = await updateCarts({ id, number, selected })
    res.json({
      code: 0,
      msg: 'success',
      data: result,
    })
  }
  async remove(req, res) {
    let id = req.params.id || ''
    let ids = (req.body && req.body.ids) || [] || []
    if (id) ids = [...new Set([...ids, +id])]
    const result = await removeCarts(ids)
    res.json({
      code: 0,
      msg: 'success',
      data: result,
    })
  }
  async selectAll(req, res) {
    const { id: user_id } = req.user
    const result = await selectAllCarts(user_id)
    res.json({
      code: 0,
      msg: 'success',
      data: result,
    })
  }
  async unSelectAll(req, res) {
    const { id: user_id } = req.user
    const result = await unSelectAllCarts(user_id)
    res.json({
      code: 0,
      msg: 'success',
      data: result,
    })
  }
  async toggleSelectAll(req, res) {
    const { id: user_id } = req.user
    const { selected } = req.body
    const result = await toggleSelectAllCarts(user_id, selected)
    res.json({
      code: 0,
      msg: 'success',
      data: result,
    })
  }
  async count(req, res) {
    const result = await cartsCount()
    res.json({
      code: 0,
      msg: 'success',
      data: result,
    })
  }
}

module.exports = new CartsController()
