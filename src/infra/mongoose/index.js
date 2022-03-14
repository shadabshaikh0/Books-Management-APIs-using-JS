import mongoose from 'mongoose'
import { basename as _basename, join } from 'path'
import { readdirSync } from 'fs'
const basename = _basename(__filename)
module.exports = ({ config, basePath }) => {
    const db = {}
    db.models = {}  
    try {
        mongoose.connect('mongodb://localhost:27017/test');
    } catch(err) {
    }
}
