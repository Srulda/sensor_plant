import { observable, action } from "mobx";
import Plant from "../components/Plant";
import Axios from "axios";

export class UserStore {
  @observable myPlants = [];

  @observable userName = "";
  @observable sensorName = ""
  @action handleInput = (name, value) => {
    this[name] = value;
  };

  @action signUp = async userName => {
    if (userName === "") {
      alert("Please Insert User Name");
    }if(userName.length >12){
      alert("User name must have between 1-12 letters")
    }else {
      let dataNameCheck = await Axios.get(`http://localhost:2805/userLogin/${userName}`);
      if (dataNameCheck.data !== "") {
        alert("This User Name Already In Use")
    }else{
      let user = { userName: userName, plants: [] , sensors: [{1:`${this.sensorName}`}]};
      this.userName = userName;
      console.log("----------",user)
      await Axios.post(`http://localhost:2805/signUp/`, user);
      let data = await Axios.get(`http://localhost:2805/userLogin/${userName}`)
      let savedData = JSON.stringify(data.data)
      sessionStorage.setItem("currentLogin", savedData);
      window.location = `http://localhost:3000/home`;
    }
  }
}

  @action isLoggedIn = async userName => {
    if (userName === "") {
      alert("Please Insert User Name");
    } else {
      let data = await Axios.get(`http://localhost:2805/userLogin/${userName}`);

      if (data.data === "") {
        alert("user not found");
      } else {
        console.log(data);

        let savedData = JSON.stringify(data.data)
        sessionStorage.setItem("currentLogin", savedData);
        window.location = `http://localhost:3000/home`;
        return data.data;
      }
    }
  }

  @action addPlant = async  (plantName , img) => {
    let newPlant = new Plant(plantName, img);
    console.log(`created new plant ${plantName}`);

    // this.myPlants.push(newPlant);
    console.log(sessionStorage.getItem('currentLogin', 'userName'));
    let user =JSON.parse(sessionStorage.getItem('currentLogin'))
    console.log(user._id)
    let sendData = {
      plantName : plantName,
      userId : user._id
    }
    await Axios.post(`http://localhost:2805/user/myPlants`,sendData );
    };
}
