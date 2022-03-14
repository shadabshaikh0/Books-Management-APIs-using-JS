import mongoose from 'mongoose'
module.exports = ({ config }) => {
    try {
        mongoose.connect(config.host+'://'+config.username+':'+config.password+'@cluster0.twjgw.mongodb.net/'+config.database+'?retryWrites=true&w=majority');
        console.log("Database connected successfully");
    } catch(err) {
    }    
}
