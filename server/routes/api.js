const express = require('express')
const router = express.Router()
const Plants = require('../model/Plants')
const MyPlants = require('../model/MyPlants')
const request = require('request')

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






router.get('/myPlantsBasil', function (req, res) {
    request(`http://192.168.170.58`, function (err, response) {
        // let data = JSON.parse(response.body) 
        let data = (response.body)   
        // res.sendFile(data)
        console.log(data)
})
})















module.exports = router