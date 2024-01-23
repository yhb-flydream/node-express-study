const { hasNotAdminPermission } = require('../errorType')

const hadAdminPermission = async (req, res, next) => {
  console.log('is_admin :>> ', req.user)
  const { is_admin } = req.user
  if (!is_admin) {
    return res.send(hasNotAdminPermission)
  }
  await next()
}

module.exports = {
  hadAdminPermission,
}
