const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const api = require("./server/routes/api");
const mongoose = require("mongoose");
const Plants = require("./server/model/Plants");
const MyPlants = require("./server/model/MyPlants");
const moment = require("moment");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/sensor_plant",
  { useNewUrlParser: true, useFindAndModify: false }
);

//for production only
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

//data insert
// let data = require('./data.json')

// for(let d of data){
//     let t1 = new Plants(d)
//     console.log(d)
//     t1.save()
// }

<<<<<<< HEAD

// function myFunction() {
//     setInterval(
//         function(){ 
//             let t1 = new MyPlants({c: (Math.random() * 20 ),h:  (Math.random() * 16),}
//             )
//                  t1.save()
//                  console.log(t1)
//         }, 3000);
//   }

//   myFunction()




const PORT = 2805
app.listen(process.env.PORT || PORT, function () {
    console.log(`server running on ${PORT}`)
})
=======
function myFunction() {
  setInterval(function() {
    let t1 = new MyPlants({ c: Math.random() * 20, h: Math.random() * 16 });
    t1.save();
    console.log(t1);
  }, 3000);
}

myFunction();

const PORT = 2805;
app.listen(process.env.PORT || PORT, function() {
  console.log(`server running on ${PORT}`);
});
>>>>>>> master
