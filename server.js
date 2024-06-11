const express = require('express');
const app = express();
const axios = require('axios'); // Import axios library
const { dbConnect } = require('./config/dbConnect');
const { router } = require('./routes/router');
const cors = require('cors');

app.use(express.json());
app.use(cors());

let PORT = 3000;

dbConnect();

app.use('/api/v1', router);


app.get('/', (req, res) => {
  res.send('This is my home page');
});

app.listen(PORT , (req, res) => {
  console.log(`Server is running on port ${PORT}`);
})
