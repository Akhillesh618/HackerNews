

const mongoose = require('mongoose');


const newsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});


const news = mongoose.model("news", newsSchema);
module.exports = news;