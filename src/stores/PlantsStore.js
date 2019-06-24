import { observable, action } from "mobx";
import Axios from "axios";

export class PlantsStore {
  @observable plants = [];

  @action getDataFromDB = async () => {
    let data = await Axios.get(`http://localhost:2805/plants`);
    this.plants = data.data;
    return this.plants;
  };

  @action getPlantMaxTemp = plant => {
    if (!plant) {
      return "no plant";
    } else {
      let plantObj = this.plants.find(p => p.name === plant);
      return plantObj.temperature_max;
    }
  };

  @action getPlantMinTemp = plantName => {
    if (!plantName) {
      return;
    } else {
      let plantObj = this.plants.find(p => p.name === plantName);
      return plantObj.temperature_min;
    }
  };
  @action getPlantMaxHumid = plantName => {
    if (!plantName) {
      return;
    } else {
      let plantObj = this.plants.find(p => p.name === plantName);
      return plantObj.humid_max;
    }
  };
  @action getPlantMinHumid = plantName => {
    if (!plantName) {
      return;
    } else {
      let plantObj = this.plants.find(p => p.name === plantName);
      return plantObj.humid_min;
    }
  };
  @action getPlantMaxMoist = plantName => {
    if (!plantName) {
      return;
    } else {
      let plantObj = this.plants.find(p => p.name === plantName);
      return plantObj.moist_max;
    }
  };
  @action getPlantMinMoist = plantName => {
    if (!plantName) {
      return;
    } else {
      let plantObj = this.plants.find(p => p.name === plantName);
      return plantObj.moist_min;
    }
  };
}
