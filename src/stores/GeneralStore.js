import { observable, action } from "mobx";
import Axios from "axios";
import { async } from "q";

export class GeneralStore {
  @observable name;
  @observable loading = true;

  @action handleInput = (name, value) => {
    this[name] = value;
  };

  @action isLoggedIn = async userName => {
    let data = await Axios.get(`http://localhost:2805/userLogin/${userName}`)
    console.log(data)
    return data
  }

  @action signUp = async userName => {
    let user = {userName : userName, plants : []}
    console.log(user)
    await Axios.post(`http://localhost:2805/signUp/`, user)
  }
}


