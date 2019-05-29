const express = require('express')
const router = express.Router()
const Plants = require('../model/Plants')


router.get('/plants', function(req,res){
    Plants.find({}, function(err, result){
        res.send(result)
    })
})


















module.exports = router