


const mongoose = require('mongoose');
require("dotenv").config();
const url = process.env.URL;

mongoose.connect(
    url
, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const con = mongoose.connection;

con.on("open",function()
{
    console.log("Connected To Database");
})