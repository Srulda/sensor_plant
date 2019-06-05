import { observable, computed, action } from "mobx";
import Axios from "axios";

export class PlantsStore {
  @observable plants = [];

  @action getDataFromDB = async () => {
    let data = await Axios.get(`http://localhost:2805/plants`)
    this.plants = data.data
    return this.plants;
  };

  @action getPlantMaxTemp =(plant) =>{
    let plantObj = this.plants.find(p=> p.name === plant)
    return plantObj.temperature_max
  }
  @action getPlantMinTemp =(plant) =>{
    let plantObj = this.plants.find(p=> p.name === plant)
      return plantObj.temperature_min
  }
  @action getPlantMaxHumid= (plant) =>{
    let plantObj = this.plants.find(p=> p.name === plant)
      return plantObj.humid_max
  }
  @action getPlantMinHumid= (plant) =>{
    let plantObj = this.plants.find(p=> p.name === plant)
      return plantObj.humid_min
  }
  @action getPlantMaxMoist= (plant) =>{
    let plantObj = this.plants.find(p=> p.name === plant)
      return plantObj.moist_max
  }
  @action getPlantMinMoist= (plant) =>{
    let plantObj = this.plants.find(p=> p.name === plant)
      return plantObj.moist_min
  }
  

}
