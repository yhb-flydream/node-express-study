const Addr = require('../model/addr.model')

class AddrService {
  async createAddress(address) {
    return await Addr.create(address)
  }
  async findAllAddress(user_id) {
    return await Addr.findAll({
      attributes: ['id', 'consignee', 'phone', 'address', 'is_default'],
      where: { user_id },
    })
  }
  async updateAddress({ id, ...address }) {
    return await Addr.update(address, { where: { id } })
  }
  async removeAddress(id) {
    return await Addr.destroy({ where: { id } })
  }
  async setDefaultAddress(user_id, id) {
    await Addr.update(
      {
        is_default: false,
      },
      {
        where: { user_id },
      }
    )
    return await Addr.update(
      {
        is_default: true,
      },
      {
        where: { user_id, id },
      }
    )
  }
}

module.exports = new AddrService()
