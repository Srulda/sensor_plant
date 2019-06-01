import { observable, action } from "mobx";
import Axios from "axios";
import io from "socket.io-client";

export class ItemStore {
  constructor() {
    this.socket = io("http://localhost:2805");
    this.socket.on(`plant_stats`, data => {
      this.plants = [data];
    });

    setInterval(() => {
      this.getDataFromDB();
    }, 1000);
  }
  @observable plants = [];

  @action getDataFromDB = () => {
    // Axios.get(`http://localhost:2805/myPlantsBasil`).then(data => {
    //   console.log(data);
    //   this.plants = [data.data];
    //   console.log(this.plants);
    // });
    this.socket.emit(`plant_stats`);
  };
}
