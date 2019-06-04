
const express      = require("express"),
      app          = express(),
      bodyParser   = require("body-parser"),
      path         = require("path"),
      api          = require("./server/routes/api"),
      mongoose     = require("mongoose"),
      Plants       = require("./server/model/Plants"),
      Users        = require("./server/model/Users"),
      Sensor     = require("./server/model/Sensor"),
      MyPlants     = require("./server/model/myPlants"),
      moment       = require("moment"),
      http         = require("http").Server(app),
      io           = require("socket.io")(http),
      request      = require("request")

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/sensor_plant",
  { useNewUrlParser: true, useFindAndModify: false }
);
//authentication
// app.use(require("express-session")({
//   secret : "just nod if you can hear me is there anyone at home",
//   resave : false,
//   saveUninitialized : false
// }))
// app.use(passport.initialize())
// app.use(passport.session())
// passport.serializeUser(Users.serializeUser())
// passport.deserializeUser(Users.deserializeUser())

// app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  next();
});
app.use("/", api);

//for production only
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// })

// let users = require("./users.json");
// for (let u of users) {
//   let u1 = new Users(u);
//   console.log(u);
//   u1.save();
// }

// let data = require("./data.json");
// for (let d of data) {
//   let t1 = new Plants(d);
//   console.log(d);
//   t1.save();
// }

// function myFunction() {
//     setInterval(
//         function(){
//             let t1 = new MyPlants({c: (Math.random() * 20 ),h:  (Math.random() * 16),m : (Math.random() * 50 )}
//             )
//                  t1.save()
//                  console.log(t1)
//         }, 3000);
//   }

//   myFunction()

io.on("connection", function(socket) {
  socket.on(`plant_stats`, () => {
    // request(`http://localhost:2805/sensorLive`, (err, response) => {
    //   let data = JSON.parse(response.body);
    //   socket.emit(`plant_stats`, data);
    // });
  });

  socket.on(`plant_history`, () => {
    request(`http://localhost:2805/sensorHistory`, (err, response) => {
      let data = JSON.parse(response.body);
      socket.emit(`plant_history`, data);
    });
  });
});

const PORT = 2805;
http.listen(process.env.PORT || PORT, function() {
  console.log(`server running on ${PORT}`);
});
