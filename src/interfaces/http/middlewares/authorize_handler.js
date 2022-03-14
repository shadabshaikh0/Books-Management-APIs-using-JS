module.exports = ({ CustomError, constants: { UNAUTHORIZED_REQUEST } }) => (
    userRole
) => {
  return (req, res, next) => {
    if (
      !req.user.isAdmin && userRole.isAdmin != req.user.isAdmin
    ) {
      throw new CustomError(
        UNAUTHORIZED_REQUEST.code,
        UNAUTHORIZED_REQUEST.status
      )
    }
    next()
  }
}
