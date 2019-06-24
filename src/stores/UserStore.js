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
        this.userName = userName;
        await Axios.post(`http://localhost:2805/signUp/`, user);
        let data = await Axios.get(
          `http://localhost:2805/userLogin/${userName}`
        );
        let dataToStorage = {
          user_id: data.data._id,
          userName: data.data.userName,
          plants: data.data.plants,
          sensors: data.data.sensors
        };
        let savedData = JSON.stringify(dataToStorage);
        sessionStorage.setItem("currentLogin", savedData);
        window.location = `http://localhost:3000/home`;
      }
    }
  };

  @action isLoggedIn = async userName => {
    if (userName === "") {
      alert("Please Insert User Name");
    } else {
      let data = await Axios.get(`http://localhost:2805/userLogin/${userName}`);

      if (data.data === "") {
        alert("user not found");
      } else {
        let dataToStorage = {
          userName: data.data.userName,
          user_id: data.data._id,
          plants: data.data.plants,
          sensors: data.data.sensors
        };
        let savedData = JSON.stringify(dataToStorage);
        sessionStorage.setItem("currentLogin", savedData);
        window.location = `http://localhost:3000/home`;
        // return data.data
      }
    }
  };

  @action getUserPlants = async userID => {
    let savedPlants = await Axios.get(
      `http://localhost:2805/user/plants/${userID}`
    );
    return (this.userPlants = savedPlants.data);
  };

  @action addPlant = async plantName => {
    let user = JSON.parse(sessionStorage.getItem("currentLogin"));
    console.log(user);
    let sendData = {
      plantName: plantName,
      userId: user.user_id
    };
    await Axios.post(`http://localhost:2805/user/newPlant`, sendData);
    this.getUserPlants(user.user_id);
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
