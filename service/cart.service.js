const { Op } = require('sequelize')

const Carts = require('../model/cart.model')
const Goods = require('../model/goods.model')

const { cartsAddError } = require('../errorType')

class CartsService {
  async createOrUpdate(user_id, goods_id) {
    try {
      let res = await Carts.findOne({
        where: {
          [Op.and]: {
            user_id,
            goods_id,
          },
        },
      })
      if (res) {
        await res.increment('number')
        return await res.reload()
      } else {
        return await Carts.create({ user_id, goods_id })
      }
    } catch (error) {
      ctx.app.emit('error', cartsAddError, ctx)
    }
  }
  async findCarts(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const { count, rows } = await Carts.findAndCountAll({
      attributes: ['id', 'number', 'selected'],
      offset,
      limit: +pageSize,
      include: {
        model: Goods,
        as: 'goods_info',
        attributes: ['id', 'goods_name', 'goods_price', 'goods_img'],
      },
    })
    return {
      total: count,
      pageNum,
      pageSize,
      data: rows,
    }
  }
  async updateCarts({ id, number, selected }) {
    const res = await Carts.findByPk(+id)
    if (!res) return ''
    number !== undefined ? (res.number = number) : ''
    selected !== undefined ? (res.selected = selected) : ''
    return await res.save()
  }
  async removeCarts(ids) {
    return await Carts.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    })
  }
  async selectAllCarts(user_id) {
    return await Carts.update(
      { selected: true },
      {
        where: { user_id },
      }
    )
  }
  async unSelectAllCarts(user_id) {
    return await Carts.update(
      { selected: false },
      {
        where: { user_id },
      }
    )
  }
  async toggleSelectAllCarts(user_id, selected) {
    return await Carts.update(
      {
        selected,
      },
      {
        where: { user_id },
      }
    )
  }
  async cartsCount() {
    return await Carts.count()
  }
}

module.exports = new CartsService()
