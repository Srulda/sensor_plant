const express = require("express"),
  router = express.Router(),
  Plants = require("../model/Plants"),
  Sensor = require("../model/Sensor"),
  Users = require("../model/Users"),
  myPlants = require("../model/myPlants"),
  request = require("request"),
  moment = require("moment");

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
  console.log(user);

  let u1 = new Users({
    userName: user.userName,
    plants: user.plants
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
  //req.body.id =  arduino's ID
  let sensorData = new Sensor(req.body);

  Users.findOne({ sensors: req.body.id }, (err, user) => {
    if (user) {
      user.sensors.push(sensorData);
    } else {
      console.log(err);
      return;
    }
    user.save();
  });
  console.log(Users);
  res.send(sensorData);
});

router.get("/sensorLive/:plantId", function(req, res) {
  let plantId = req.params.plantId;
  Sensor.find({})
    .sort({ timestamp: -1 })
    .limit(1)
    .exec(function(err, result) {
      myPlants.findById(plantId, function(error, plant) {
        plant.stats
          .push(result._id)
          .populate("sensors")
          .exec(function(err, data) {
            res.send(data);
          });
      });
    });
});

router.get("/sensorHistory", function(req, res) {
  Sensor.aggregate([
    { $match: {} },
    {
      $group: {
        _id: {
          year: { $year: "$timestamp" },
          month: { $month: "$timestamp" },
          day: { $dayOfMonth: "$timestamp" },
          hour: { $hour: "$timestamp" },
          minute: { $minute: "$timestamp" }
        },
        avgTemp: { $avg: "$c" },
        avgHum: { $avg: "$h" },
        avgMos: { $avg: "$m" }
      }
    },
    { $sort: { _id: 1 } }
  ]).exec(function(err, result) {
    res.send(result);
  });
});

// router.get("/sensorStats", function(req, res) {
//   request(`http://192.168.130.186`, function(err, response) {
//     let data = response.body;
//     let dataObj = {};
//     // res.sendFile(data)
//     dataObj.c = Number(data.split("<p>")[1].split("</p>")[0]);
//     dataObj.h = Number(data.split("<p>")[2].split("</p>")[0]);
//     dataObj.m = Number(data.split("<p>")[3].split("</p>")[0]);
//     let c = new Sensor(dataObj);
//     c.save();

//     res.send(c);
//   });
// });

let UserIDfromDB = async userName => {
  await Users.findOne({ name: `${userName}` }, "_id", (err, user) => {
    console.log(user);
    return user;
  });
};

router.post("/user/myPlants", async (req, res) => {
  let data = req.body;
  console.log(req.body);
  let newPlant = await new myPlants({
    name: data.plantName
  });

  newPlant.save();
  console.log("this is new plant", newPlant._id);
  console.log(`saved new plant ${newPlant.name} to DB`);
  Users.findById(data.userId, function(error, user) {
    user.plants.push(newPlant._id);
    user.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.send("YEESSSHHH");
      }
    });
    console.log("User", user);
  });
});

router.get("/user/myplants/:userId", function(req, res) {
  let userId = req.params.userId;
  Users.findOne({ _id: `${userId}` })
    .populate("plants")
    .exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Data", data);
        res.send(data.plants);
      }
    });
});

module.exports = router;
