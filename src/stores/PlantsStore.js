import { observable, computed, action } from "mobx";
import Axios from "axios";

export class PlantsStore {
  @observable plants = [];

  @action getDataFromDB = async () => {
    let data = await Axios.get(`http://localhost:2805/plants`)
    this.plants = data.data
    return this.plants;
  };

  @computed get getBasilMaxTemp (){
    let basilObj = this.plants.find(p=> p.name === "Basil")
    return basilObj.temperature_max
  }
  @computed get getBasilMinTemp (){
    let basilObj = this.plants.find(p=> p.name === "Basil")
      return basilObj.temperature_min
  }
  @computed get getBasilMaxHumid (){
    let basilObj = this.plants.find(p=> p.name === "Basil")
      return basilObj.humid_max
  }
  @computed get getBasilMinHumid (){
    let basilObj = this.plants.find(p=> p.name === "Basil")
      return basilObj.humid_min
  }
  @computed get getBasilMaxMoist (){
    let basilObj = this.plants.find(p=> p.name === "Basil")
      return basilObj.moist_max
  }
  @computed get getBasilMinMoist (){
    let basilObj = this.plants.find(p=> p.name === "Basil")
    console.log(basilObj.moist_min)
      return basilObj.moist_min
  }
  

}
