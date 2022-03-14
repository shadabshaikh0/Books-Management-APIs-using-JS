import mongoose from 'mongoose'
module.exports = () => {
    const userSchema = new mongoose.Schema({
        uuid: String,
        name: String,
        isAdmin: Boolean,
        isActive: Boolean
    })
    const userModel = mongoose.model('user', userSchema);
    return userModel;
}
