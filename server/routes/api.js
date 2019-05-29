const express = require('express')
const router = express.Router()
const Plants = require('../model/Plants')
const MyPlants = require('../model/MyPlants')

router.get('/plants', function(req,res){
    Plants.find({}, function(err, result){
        res.send(result)
    })
})

router.get('/myPlants', function(req,res){
    MyPlants.find({}, function(err, result){
        res.send(result)
    })
})





















module.exports = router