import { observable, action } from "mobx";
import Axios from "axios";
export class UserStore {
  @observable userPlants = [];
  @observable userName = "";
  @observable sensorName = "";

  @action handleInput = (name, value) => {
    this[name] = value;
  };

  @action signUp = async userName => {
    this.userName = userName;
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

        alert("This User Name Already In Use");
      } else {
        
          let user = {
          userName: userName,
          plants: [],
          sensors: [this.sensorName]
        };
        
        await Axios.post(`http://localhost:2805/signUp/`, user);
        let data = await Axios.get(
          `http://localhost:2805/userLogin/${userName}`
        )
        
        let userID = JSON.stringify(data.data._id)
        let user_Name = JSON.stringify(data.data.userName)
        let plants = JSON.stringify(data.data.plants)
        let sensors = JSON.stringify(data.data.sensors)

        sessionStorage.setItem("userID", userID)
        sessionStorage.setItem("userName", user_Name)
        sessionStorage.setItem("userPlants", plants)
        sessionStorage.setItem("userSensors", sensors)
        window.location = `http://localhost:3000/home`;
      }
    }
  };

  @action isLoggedIn = async userName => {
    if (userName === "") {
      alert("Please Insert User Name");
    } else {
      let data = await Axios.get(`http://localhost:2805/userLogin/${userName}`)

      if (data.data === "") {
        alert("user not found");
      } else {
        let userID = JSON.stringify(data.data._id)
        let user_Name = JSON.stringify(data.data.userName)
        let plants = JSON.stringify(data.data.plants)
        let sensors = JSON.stringify(data.data.sensors)

        window.location = `http://localhost:3000/home`

        sessionStorage.setItem("userID", userID)
        sessionStorage.setItem("userName", user_Name)
        sessionStorage.setItem("userPlants", plants)
        sessionStorage.setItem("userSensors", sensors)

      }
    }
  };

  @action getUserPlants = async userID => {
    let savedPlants = await Axios.get(
      `http://localhost:2805/user/plants/${userID}`
    )

    let plantIds = savedPlants.data.map(i => i._id)
    let plantsIdToStorage = JSON.stringify(plantIds)
    sessionStorage.setItem("userPlants", plantsIdToStorage);
    this.userPlants = savedPlants.data

  };

  @action addPlant = async plantName => {

    let userID = JSON.parse(sessionStorage.getItem("userID"))
    let sendData = {
      plantName: plantName,
      userId: userID
    };
    await Axios.post(`http://localhost:2805/user/newPlant`, sendData);
    await this.getUserPlants(userID)
    

   
  };

  @action conncetPlantToSensor = (userID, plantID, sensorID) => {
    let update = {
      user_Id: userID,
      plant_Id: plantID,
      sensor_Id: sensorID
    };
    const sendData = async () => {
      await Axios.put(`http://localhost:2805/user/plant/activate`, update);
    };

    sendData();
  };

  @action disconnectPlantFromSensor = async (userID, plantID) => {
    let update = {
      user_Id: userID,
      plant_Id: plantID
    };

    await Axios.put(`http://localhost:2805/user/plant/activate`, update)
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}
