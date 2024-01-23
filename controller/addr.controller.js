const { createAddress, findAllAddress, updateAddress, removeAddress, setDefaultAddress } = require('../service/addr.service')

class AddrController {
  async create(req, res) {
    const { id: user_id } = req.user
    const { consignee, phone, address } = req.body
    const result = await createAddress({ user_id, consignee, phone, address })
    res.json({
      code: 0,
      msg: 'success',
      data: result,
    })
  }
  async findAll(req, res) {
    const { id: user_id } = req.user
    const result = await findAllAddress(user_id)
    res.json({
      code: 0,
      msg: 'success',
      data: result,
    })
  }
  async update(req, res) {
    const { id } = req.params
    const { consignee, phone, address } = req.body
    const result = await updateAddress({ id, consignee, phone, address })
    res.json({
      code: 0,
      msg: 'success',
      data: result,
    })
  }
  async remove(req, res) {
    const { id } = req.params
    const result = await removeAddress(id)
    res.json({
      code: 0,
      msg: 'success',
      data: result,
    })
  }
  async setDefault(req, res) {
    const { id: user_id } = req.user
    const { id } = req.params
    const result = await setDefaultAddress(user_id, id)
    res.json({
      code: 0,
      msg: 'success',
      data: result,
    })
  }
}

module.exports = new AddrController()
