import { observable, computed, action } from "mobx";
import Axios from "axios";

export class ItemStore {
  @observable plants = [];

  getDataFromDB = async () => {
    let data = await Axios.get(`http://localhost:2805/myPlants`);
    this.plants = data.data
    
    return data.data;
  };

  // @action addPlant = plantName => {
  //   let newPlant = new Plant(plantName);
  //   this.plants.push(plantName);
  // };
}
