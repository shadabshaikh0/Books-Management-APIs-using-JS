import { define } from '../../containerHelper'
module.exports = define('bookService', ({
  bookRepository
}) => {
  const createBook = async (data) => {
    return bookRepository.create(data)
  }
  const findBook = async (searchArg) => {
    return bookRepository.findOne(searchArg)
  }
  const findBooks = async (searchArg) => {
    return bookRepository.findAll(searchArg)
  }

  return {
    createBook,
    findBook,
    findBooks
  }
})
