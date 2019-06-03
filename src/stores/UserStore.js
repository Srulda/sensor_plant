import { observable, action } from "mobx";
import Plant from "../components/Plant";
import Axios from "axios";

export class UserStore {
  @observable myPlants = [];
  @observable userName;

  @action handleInput = (name, value) => {
    this[name] = value;
  };

  @action signUp = async userName => {
    let user = { userName: userName, plants: [] };
    this.userName = userName;
    await Axios.post(`http://localhost:2805/signUp/`, user);
  };

  @action isLoggedIn = async userName => {
    let data = await Axios.get(`http://localhost:2805/userLogin/${userName}`);
    this.userName = userName;
    console.log(this.userName);
    console.log(data);

    return data;
  };

  @action addPlant = plantName => {
    let newPlant = new Plant(plantName);
    console.log(`created new plant ${plantName}`);
    console.log(this.userName);
    this.myPlants.push(newPlant);
  };
}
