import { define } from '../../../containerHelper'
import book from '../../database/models/book'
module.exports = define('bookRepository', ({}) => {
  const bookModel = book

  const createbook = bookEntity => bookModel.create(bookEntity)

  const update = async (bookEntity, id) => {
    const res = await bookModel.update(bookEntity, {
      where: {
        id
      }
    })
    return res
  }
  const find = async searchArg => {
    const bookDetails = await bookModel.findOne({
      where: searchArg
    })
    return bookDetails
  }
  const findAll = async searchArg => {
    const bookDetails = await bookModel.findAll({
      where: searchArg
    })
    return bookDetails
  }

  return {
    createbook,
    update,
    find,
    findAll
  }
})
