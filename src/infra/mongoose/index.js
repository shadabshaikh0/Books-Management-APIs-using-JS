import mongoose from 'mongoose'
module.exports = () => {
    try {
        mongoose.connect('mongodb+srv://shadabshaikh0:D9x8yG2gDh5Gamc@cluster0.twjgw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        console.log("Database connected successfully");
    } catch(err) {
    }    
}
