const express = require("express"),
  router = express.Router(),
  Plants = require("../model/Plants"),
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
  //req.body.id =  arduino's ID

  let sensorData = req.body;
  
  sensorData.timestamp = moment().format()
  Users.findOne({ sensors: `${req.body.id}` }, (err, user) => {
    if (user) {
      user.stats.push(sensorData);
      user.save();
    }
  });

  res.send(sensorData);
});


router.get("/sensorLive/:plantId", async function(req, res) {
  let plantId =  await req.params.plantId;
  Users.find({ plants: { _id: `${plantId}` } }, (err, result) => {
    let plantStats = result[0].stats
    plantStats.find(r => {
        r.plantID === plantId;
      })
     let liveData =  plantStats.splice(plantStats.length -1)
    res.send(liveData);
  });
})

router.get("/sensorHistory/:plantId", async function(req, res) {
  let plantId =  await req.params.plantId;
  Users.find({ plants: { _id: `${plantId}` } }, (err, result) => {
    let plantStats = result[0].stats
    let data = plantStats.find(r => {
      r.plantID === plantId;
    })
  //         hour: { $hour: "$timestamp" },
  //         minute: { $minute: "$timestamp" }
  //       },
  //       avgTemp: { $avg: "$c" },
  //       avgHum: { $avg: "$h" },
  //       avgMos: { $avg: "$m" }
  //     }
  //   },
  //   { $sort: { _id: 1 } }
  // ])
  // .exec(function(err, result) {
  //   res.send(result);
  // });
  console.log(plantStats);
  
  console.log(data)
  res.send(plantStats.splice(0,60))
});
} )

let UserIDfromDB = async userName => {
  await Users.findOne({ name: `${userName}` }, "_id", (err, user) => {
    return user;
  });
};

router.post("/user/myPlants", async (req, res) => {
  let data = req.body;
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

router.put("/user/stats", async (req, res) => {
  let userId = req.body.user_Id;
  let plantId = req.body.plant_Id;
  let user = await Users.findById(userId);
  let userStats = [...user.stats];
  for (let s of userStats) {
    if (!s["plantID"]) {
      s["plantID"] = plantId;
    }
  }
  user = await Users.update({ _id: [userId] }, { $set: { stats: userStats } }, {new: true});
  console.log(user);
  
  res.send(user);
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
