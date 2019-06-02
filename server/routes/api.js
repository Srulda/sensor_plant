const express = require("express");
const router = express.Router();
const Plants = require("../model/Plants");
const MyPlants = require("../model/MyPlants");
const Users = require("../model/Users");
const request = require("request");
const moment = require("moment");

router.get(`/userLogin/:userName`, function(req, res){
  let user = req.params.userName
  Users.findOne({'userName' : `${user}`}, function(err, result){
  res.send(result)
  })

})

router.post("/signUp/", function(req, res){
  const user = req.body
  console.log(user);
  
    let u1 = new Users({
    userName : user.userName,
    plants : user.plants
  })
  u1.save().then(function(u){
    res.send(u)
  })
})

router.get("/plants", function(req, res) {
  Plants.find({}, function(err, result) {
    res.send(result);
  });
});

router.get("/myPlants", function(req, res) {
  MyPlants.find({ timestamp: { $gte: moment().subtract(2, "minutes") } })
    .sort({ timestamp: -1 })
    .exec(function(err, result) {
      res.send(result);
    });
});

router.get("/myPlantsBasil", function(req, res) {
  request(
    `http://192.168.130.186`,

    function(err, response) {
      let data = response.body;
      let dataObj = {};
      // res.sendFile(data)
      dataObj.c = Number(data.split("<p>")[1].split("</p>")[0]);
      dataObj.h = Number(data.split("<p>")[2].split("</p>")[0]);
      dataObj.m = Number(data.split("<p>")[3].split("</p>")[0]);
      let c = new MyPlants(dataObj);
      c.save();

      res.send(c);
    }
  );
});

module.exports = router;
