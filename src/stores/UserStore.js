import { observable, action } from "mobx";
import Axios from "axios";
const moment = require("moment") 
export class UserStore {

  @observable myPlants = []
  @observable userName = ""
  @observable sensorName = ""

  @action handleInput = (name, value) => {
    this[name] = value;
  };

  @action signUp = async userName => {
    if (userName === "") {
      alert("Please Insert User Name");
    }
    if (userName.length > 12) {
      alert("User name must have between 1-12 letters");
    } else {
      let dataNameCheck = await Axios.get(
        `http://localhost:2805/userLogin/${userName}`
      );
      if (dataNameCheck.data !== "") {
        alert("This User Name Already In Use")
    }else{
      let user = { userName: userName, plants: [] , sensors: [this.sensorName]};
      this.userName = userName;
      await Axios.post(`http://localhost:2805/signUp/`, user);
      let data = await Axios.get(`http://localhost:2805/userLogin/${userName}`)
      let savedData = JSON.stringify(data.data)
      sessionStorage.setItem("currentLogin", savedData);
      window.location = `http://localhost:3000/home`;
    }
  };
  }

  @action isLoggedIn = async userName => {
    if (userName === "") {
      alert("Please Insert User Name");
    } else {
      let data = await Axios.get(`http://localhost:2805/userLogin/${userName}`);
      
      if (data.data === "") {
        alert("user not found");
      } else {
        let savedData = JSON.stringify(data.data);
        sessionStorage.setItem("currentLogin", savedData);
        window.location = `http://localhost:3000/home`;
        return data.data;
      }
    }
  };

  @action addPlant = async plantName => {
    // let newPlant = new Plant(plantName, img);
    console.log(`created new plant ${plantName}`);
    let user = JSON.parse(sessionStorage.getItem("currentLogin"));
    let sendData = {
      plantName: plantName,
      userId: user._id
    };
    await Axios.post(`http://localhost:2805/user/myPlants`, sendData);
    this.getUserPlants(user._id)
  };

  @action getUserPlants = async userID => {
    let savedPlants = await Axios.get(
      `http://localhost:2805/user/myplants/${userID}`
    );
    return (this.myPlants = savedPlants.data);
  };


  

  @action conncetPlantToSensor =  (userID, plantID) => {
        let update = {
        user_Id: userID,
        plant_Id: plantID
      }
      
    setInterval( async () => {
        await Axios.put(`http://localhost:2805/user/stats`, update)
     
  }, 1500);

  }


  


}
