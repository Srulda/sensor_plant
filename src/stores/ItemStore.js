import { observable, action } from "mobx";
import Axios from "axios";
import io from "socket.io-client";

export class ItemStore {
  constructor() {
    this.socket = io("http://localhost:2805");
    this.socket.on(`plant_stats`, data => {
      this.stats = data;
    });
    this.socket.on(`plant_history`, data => {
      this.plantHistory = data;
    });

    setInterval(() => {
      this.getLiveStats();
    }, 1000);

    setInterval(() => {
      this.getPlantHistory();
    }, 10000);
  }
  @observable plantHistory = [];
  @observable stats = {};

  @action getLiveStats = () => {
    // Axios.get(`http://localhost:2805/myPlantsBasil`).then(data => {
    //   console.log(data);
    //   this.plants = [data.data];
    //   console.log(this.plants);
    // });
    this.socket.emit(`plant_stats`);
  };

  @action getPlantHistory = () => {
    this.socket.emit(`plant_history`);
  };
}
