const express = require('express')
const routes=require("./routes/index.routes");
const mongoose = require('mongoose')
const config=require("./config/config");


mongoose
  .connect(config.mongoose.url)
  .then(() => console.log('Connected to Db at ', config.mongoose.url))
  .catch((e) => console.log('Failed to connect to DB', e))

  const app = express()
  app.use(express.json())
  app.use('/', routes)
  
  app.listen(config.port, () => {
    console.log('Server listening at PORT: ', config.port)
})