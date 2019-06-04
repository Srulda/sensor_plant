import { observable, action } from "mobx";
import Plant from "../components/Plant";
import Axios from "axios";

export class UserStore {
  @observable myPlants = [];

  @observable userName = "";
  @observable loggedIn = false;

  @action handleInput = (name, value) => {
    this[name] = value;
  };

  @action signUp = async userName => {
    let user = { userName: userName, plants: [] };
    this.userName = userName;
    await Axios.post(`http://localhost:2805/signUp/`, user);
  };

  @action isLoggedIn = async userName => {
    if (userName === "") {
      alert("Please Insert User Name");
    } else {
      let data = await Axios.get(`http://localhost:2805/userLogin/${userName}`);
      // this.userName = userName;
      if (data.data === "") {
        alert("user not found");
      } else {
        console.log(data);
        sessionStorage.setItem("currentLoginId", data.data);
        this.loggedIn = true;
        return data.data;
      }
    }
  };

  @action addPlant = plantName => {
    Axios.post(`http://localhost:2000/users/myPlants`, plantName)
      .catch(error => {
        console.log(error);
      })
      .then(result => {
        return result;
      });
  };
}
