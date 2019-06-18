const express = require("express"),
  router = express.Router(),
  Plants = require("../model/Plants"),
  Users = require("../model/Users"),
  myPlants = require("../model/myPlants"),
  request = require("request"),
  moment = require("moment"),
  uuidv4 = require("uuid/v4");

router.get(`/userLogin/:userName`, function(req, res) {
  let user = req.params.userName;
  Users.findOne({ userName: `${user}` }, function(err, result) {
    if (result) {
      res.send(result);
    } else {
      res.end();
    }
  });
});

router.post("/signUp/", function(req, res) {
  const user = req.body;

  let u1 = new Users({
    userName: user.userName,
    plants: user.plants,
    sensors: user.sensors
  });
  u1.save().then(function(u) {
    res.send(u);
  });
});

router.get("/plants", function(req, res) {
  Plants.find({}, function(err, result) {
    res.send(result);
  });
});

router.post("/sensorData", function(req, res) {
  let sensorData = req.body;
  sensorData.timestamp = moment().format();
  
  Users.findOne({ sensors: `${req.body.id}` }, (err, user) => {
    
    if (user.plants.length === 0) {
      return;
    } else {
      user.plants.forEach(p => {
        if (p.active && p.activeSensor === sensorData.id) {
          p.stats.push(sensorData);
          console.log(p.stats);
          
          user.save();
        }
      });
    }
  });

  res.send(sensorData);
});

router.get("/sensorLive/:plantId/:userId", async function(req, res) {
  let plantId = await req.params.plantId;
  let userId = await req.params.userId;

  Users.findOne({ _id: `${userId}` }, function(err, result) {
    let plant = result.plants.find(p => {
      p._id === plantId;
      return p;
    });
    res.send(plant.stats);
  });
});

router.post("/user/myPlants", async (req, res) => {
  let data = req.body;
  let newPlant = {
    _id: uuidv4(),
    name: data.plantName,
    active: false,
    activeSensor: "",
    stats: []
  };

  Users.findById(data.userId, function(error, user) {
    user.plants.push(newPlant);
    user.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.send(newPlant);
      }
    });
  });
});

router.put("/user/plant/activate", async (req, res) => {
  let userId = req.body.user_Id;
  let plantId = req.body.plant_Id;
  let sensorId = req.body.sensor_Id;
  let user = await Users.findById(userId);
  let plantArr = [...user.plants];

  for (let p of plantArr) {
    if (p._id === plantId) {
      p.active = !p.active;
      p.activeSensor = sensorId;
    }
  }
  
  user = await Users.update(
    { _id: [userId] },
    { $set: { plants: plantArr} },
    { new: true }
  )
  res.send(user);
});

router.get("/user/myplants/:userId", function(req, res) {
  let userId = req.params.userId;
  Users.findOne({ _id: `${userId}` }).exec(function(err, data) {
    if (err) {
    } else {
      res.send(data.plants);
    }
  });
});

module.exports = router;
