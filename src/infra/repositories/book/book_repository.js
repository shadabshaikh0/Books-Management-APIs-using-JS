import { define } from '../../../containerHelper'
import book from '../../database/models/book'
module.exports = define('bookRepository', ({}) => {
  const bookModel = book()
  const create = bookEntity => {
    bookModel.create(bookEntity)  
  }

  const update = async (bookEntity, id) => {
    const res = await bookModel.findOneAndUpdate({ uuid: id }, bookEntity)
    return res
  }
  
  const softDelete = async id  => {
    const res = await bookModel.findOneAndUpdate({ uuid:id }, { isActive: false })
    return res
  }

  const getAll = async () => {
    const res = await bookModel.find({ isActive: true })
    return res
  }

  const find = async id => {
    const res = await bookModel.findOne({ uuid: id })
    return res
  }

  const softDeleteAll = async () => {
    const res = await bookModel.updateMany( {}, { isActive: false })
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
