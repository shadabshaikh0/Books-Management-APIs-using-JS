import { define } from '../../containerHelper'
import uuid from 'uuid'

module.exports = define('bookService', ({
  bookRepository
}) => {
  const createBook = async (data) => {
    data.isActive = true
    data.uuid = uuid()
    return bookRepository.create(data)
  }
  const updateBook = async (data, id) => {
    return bookRepository.update(data, id)
  }

  const deleteBook = async(id) => {
    return bookRepository.softDelete(id)
  }

  const getAllBooks = async () => {
    return bookRepository.getAll()
  }

  const findBook = async (id) => {
    return bookRepository.find(id)
  }

  const deleteAllBooks = () => {
    return bookRepository.softDeleteAll()
  }

  return {
    createBook,
    updateBook,
    deleteBook,
    getAllBooks,
    findBook,
    deleteAllBooks
  }
})
