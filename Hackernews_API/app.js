

const express = require('express');
const app = express();
require("./Database/database_connection");
require("dotenv").config();
const morgan = require("morgan");
const port = process.env.PORT; 

const user = require("./routes/user_routes");
const news = require("./routes/news_routes");


app.use(morgan("dev"));
app.use(express.json());



app.use(user);
app.use(news);


app.listen(port, () => {
    console.log(`Server started on ` + " http://localhost:" + port );
});