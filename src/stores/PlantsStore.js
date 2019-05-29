import { observable, computed, action } from "mobx";
import Axios from "axios";

export class PlantsStore {
  @observable Plants = [];

  getDataFromDB = async () => {
    let data = await Axios.get(`http://localhost:2805/plants`);
    return data.data;
  };

  // @action addPlant = plantName => {
  //   let newPlant = new Plant(plantName);
  //   this.plants.push(plantName);
  // };
}
