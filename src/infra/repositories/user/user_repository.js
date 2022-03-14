import { define } from '../../../containerHelper'
import user from '../../database/models/user'
module.exports = define('userRepository', ({}) => {
  const userModel = user()
  const create = userEntity => {
    userModel.create(userEntity)  
  }

  const update = async (userEntity, id) => {
    const res = await userModel.findOneAndUpdate({ uuid: id }, userEntity)
    return res
  }
  
  const softDelete = async id  => {
    const res = await userModel.findOneAndUpdate({ uuid:id }, { isActive: false })
    return res
  }

  const getAll = async () => {
    const res = await userModel.find({ isActive: true })
    return res
  }

  const find = async id => {
    const res = await userModel.findOne({ uuid: id })
    return res
  }

  const softDeleteAll = async () => {
    const res = await userModel.updateMany( {}, { isActive: false })
    return res
  }

  return {
    create,
    update,
    softDelete,
    getAll,
    find,
    softDeleteAll
  }
})
