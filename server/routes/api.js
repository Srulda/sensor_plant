const express = require("express");
const router = express.Router();
const Plants = require("../model/Plants");
const MyPlants = require("../model/MyPlants");
const request = require("request");

router.get("/plants", function(req, res) {
  Plants.find({}, function(err, result) {
    res.send(result);
  });
});

// router.get("/myPlants", function(req, res) {
//   MyPlants.find({}, function(err, result) {
//     res.send(result);
//   });
// });

router.get("/myPlantsBasil", function(req, res) {
  request(
    `http://192.168.0.69
    `,
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
