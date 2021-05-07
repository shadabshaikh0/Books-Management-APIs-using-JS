import { define } from '../../containerHelper'
module.exports = define('userService', ({
  userRepository
}) => {
  const createUser = async (data) => {
    return userRepository.create(data)
  }
  const findUser = async (searchArg) => {
    return userRepository.findOne(searchArg)
  }
  const findUsers = async (searchArg) => {
    return userRepository.findAll(searchArg)
  }

  return {
    createUser,
    findUser,
    findUsers
  }
})
