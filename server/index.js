require("dotenv").config();
const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')
const indexRouter = require('./routes')

mongoose.connect(DB_URL).then(console.log('DataBase is connected'));

const app = express()

app.use(cors())

const PORT = +process.env.PORT || 3000;

app.use(express.json())
app.use('/', indexRouter)


app.use((err, req, res, next) => {
    err = err ? err.toString() : "something went wrong..";
    res.status(500).json({ data: "", msg: err });
  });


app.listen(PORT,()=>{
    console.log(`Application is running on port ${PORT}`);
})