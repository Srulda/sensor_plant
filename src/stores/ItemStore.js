import { observable, action } from "mobx";
import io from "socket.io-client";

export class ItemStore {
  @observable plantHistory = [];
  @observable liveStats = {};

  constructor() {
    this.socket = io("http://localhost:2805");

    this.socket.on(`plant_stats`, data => {
      this.liveStats = data[0];
    });

    this.socket.on(`plant_history`, data => {
      this.plantHistory = data;
    });

    setInterval(this.getLiveStats, 5000);

    setInterval(this.getPlantHistory, 10000);
  }

  @action getLiveStats = () => {
    this.socket.emit(`plant_stats`);
  };

  @action getPlantHistory = () => {
    this.socket.emit(`plant_history`);
  };
}

