import { define } from '../../../containerHelper'

module.exports = define('userRepository', ({ database }) => {
  const userModel = database['user']

  const createUser = userEntity => userModel.create(userEntity)

  const update = async (userEntity, id) => {
    const res = await userModel.update(userEntity, {
      where: {
        id
      }
    })
    return res
  }
  const find = async searchArg => {
    const userDetails = await userModel.findOne({
      where: searchArg
    })
    return userDetails
  }
  const findAll = async searchArg => {
    const userDetails = await userModel.findAll({
      where: searchArg
    })
    return userDetails
  }

  return {
    createUser,
    update,
    find,
    findAll
  }
})
