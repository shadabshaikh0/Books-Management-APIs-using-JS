import mongoose from 'mongoose'
module.exports = () => {
    const bookSchema = new mongoose.Schema({
        uuid: String,
        name: String,
        releaseDate: Number,
        authorName: String,
        isActive: Boolean
    })
    const bookModel = mongoose.model('book', bookSchema);
    return bookModel;
}
