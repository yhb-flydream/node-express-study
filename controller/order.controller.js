const { createOrder, findAllOrder, updateOrder } = require('../service/order.service')

class OrderController {
  async create(req, res) {
    const { id: user_id } = req.user
    const order_number = 'AAA' + Date.now()
    const result = await createOrder({
      user_id,
      ...req.body,
      order_number,
    })
    res.json({
      code: 0,
      msg: 'success',
      data: result,
    })
  }
  async findAll(req, res) {
    const { pageNum = 1, pageSize = 10, status = 0 } = req.query
    const result = await findAllOrder({ pageNum, pageSize, status })
    res.json({
      code: 0,
      msg: 'success',
      data: result,
    })
  }
  async update(req, res) {
    const { id } = req.params
    const { status } = req.body
    const result = await updateOrder(id, status)
    res.json({
      code: 0,
      msg: 'success',
      data: result,
    })
  }
}

module.exports = new OrderController()
