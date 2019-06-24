const express = require("express"),
  router = express.Router(),
  Plants = require("../model/Plants"),
  Users = require("../model/Users"),
  UserPlant = require("../model/UserPlant"),
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

router.post("/sensorData", async function(req, res) {
  let sensorData = req.body;
  sensorData.timestamp = moment().format();
  let user = await Users.findOne({ sensors: `${req.body.id}` }).populate(
    "plants"
  );

  if (user === null || user.plants.length === 0) {
    return;
  } else {
    for (let p of user.plants) {
      if (p.active === true && Number(p.activeSensor) === sensorData.id) {
        let newStats = [...p.stats];
        newStats.unshift(sensorData);

        UserPlant.findOneAndUpdate(
          { _id: p._id },
          { $set: { stats: newStats } },
          (err, stats) => {
            if(err){
              return
            } else{
              res.send(stats)
            }
          }
        )
      }
    }
  }
})

router.get("/sensorLive/:plantId", async function(req, res) {
  let plantId = await req.params.plantId;

  UserPlant.findOne({ _id: plantId }, function(err, result) {
    if (err){
      return
    }else{
      let liveStats = result.stats[0];
      res.send(liveStats);
    }
    
  });
});

router.post("/user/newPlant", async (req, res) => {
  let data = req.body;
  console.log(data);

  let newPlant = await new UserPlant({
    name: data.plantName,
    active: false,
    activeSensor: ""
  });
  newPlant.save();

  Users.findById(data.userId, function(error, user) {
    user.plants.push(newPlant._id);
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
  let user = await Users.findById(userId).populate("plants");

  for (let p of user.plants) {
    if (p._id == plantId) {
      let activate = !p.active;
      let activeSensor = sensorId;
      user = await UserPlant.update(
        { _id: [plantId] },
        { $set: { active: activate, activeSensor } },
        { new: true }
      );
    }
  }
  res.send(`updated user ${userId} plant ${plantId} mark ${sensorId}`);
});

router.get("/user/plants/:userId", function(req, res) {
  let userId = req.params.userId;
  Users.findOne({ _id: `${userId}` })
    .populate("plants")
    .exec(function(err, data) {
      if (err) {
      } else {
        res.send(data.plants);
      }
    });
});

module.exports = router;





