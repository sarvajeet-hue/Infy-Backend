const express = require('express')
const router = express.Router();

const {extractData} = require('../controller/extractData')


router.post('/getData' ,extractData )


module.exports = {router}