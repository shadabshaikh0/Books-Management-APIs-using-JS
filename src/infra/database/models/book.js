import mongoose from 'mongoose'
module.exports = () => {
    const bookSchema = new mongoose.Schema({
        name: String
    })
    return mongoose.model('book', bookSchema);
}
