import { define } from '../../containerHelper'
import uuid from 'uuid'

module.exports = define('userService', ({
  userRepository
}) => {
  const createUser = async (data) => {
    data.isActive = true
    data.uuid = uuid()
    return userRepository.create(data)
  }
  const updateUser = async (data, id) => {
    return userRepository.update(data, id)
  }

  const deleteUser = async(id) => {
    return userRepository.softDelete(id)
  }

  const getAllUsers = async () => {
    return userRepository.getAll()
  }

  const findUser = async (id) => {
    return userRepository.find(id)
  }

  const deleteAllUsers = () => {
    return userRepository.softDeleteAll()
  }

  return {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    findUser,
    deleteAllUsers
  }
})
