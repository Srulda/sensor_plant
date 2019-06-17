import { observable, action } from "mobx";
import Axios from "axios";
import { async } from "q";

export class PlantsStore {
  @observable plants = [];

  @action getDataFromDB = async () => {
    let data = await Axios.get(`http://localhost:2805/plants`)
    this.plants = data.data
    return this.plants;
  };

  @action getPlantMaxTemp = async (plant) =>{
    if(!plant){
      return "no plant"
    }else{
      let plantObj = await this.plants.find(p=> p.name === plant)
      return plantObj.temperature_max
    }
  }
  
  @action getPlantMinTemp = async (plant) =>{
    if(!plant){
      return
    }else{
    let plantObj = await this.plants.find(p=> p.name === plant)
      return plantObj.temperature_min
    }
  }
  @action getPlantMaxHumid= async (plant) =>{
    if(!plant){
      return
    }else{
    let plantObj = await this.plants.find(p=> p.name === plant)
     return plantObj.humid_max
    }
  }
  @action getPlantMinHumid= async (plant) =>{
    if(!plant){
      return
    }else{
    let plantObj = await this.plants.find(p=> p.name === plant)
       return plantObj.humid_min
    }
  }
  @action getPlantMaxMoist= async (plant) =>{
    if(!plant){
      return
    }else{
    let plantObj = await this.plants.find(p=> p.name === plant)
       return plantObj.moist_max
    }
  }
  @action getPlantMinMoist= async (plant) =>{
    if(!plant){
      return
    }else{
    let plantObj = await this.plants.find(p=> p.name === plant)
       return plantObj.moist_min
    }
  }
  

}
