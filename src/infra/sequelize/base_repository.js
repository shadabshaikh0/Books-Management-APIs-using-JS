class BaseRepository {
  constructor (model) {
    this.model = model
  }

  findById (id) {
    return this.model.findById(id)
  }

  findAll (query) {
    query.where.recordStatus = 1
    return this.model.findAll(query)
  }

  findOne (query) {
    query.where.recordStatus = 1
    return this.model.findOne(query)
  }
}

module.exports = BaseRepository
