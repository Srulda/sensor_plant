import { observable, action } from "mobx";
import Axios from "axios";
import Home from "../components/Home";


export class GeneralStore {
  @observable name;
  @observable loading = true;

  @action handleInput = (name, value) => {
    this[name] = value;
  };

  @action isLoggedIn = async userName => {
    if(userName){
      let data = await Axios.get(`http://localhost:2805/userLogin/${userName}`)
      if(data.data === ""){
        console.log("OMG")
        } else{
        console.log(data)
        return data 
    }
    }else{
      console.log("please insert username");
      
    }
  
}


  @action signUp = async userName => {
    let user = { userName: userName, plants: [] };
    console.log(user);
    await Axios.post(`http://localhost:2805/signUp/`, user);
  };
}
