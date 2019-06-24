import { observable } from "mobx";
export class ItemStore {
  @observable plantHistory = [];
  @observable liveStats = {};
  //  this.socket = io("http://localhost:2805");

  //   this.socket.on(`plant_stats`, data => {
  //     this.liveStats = data[0];
  //   });

  //   this.socket.on(`plant_history`, data => {
  //     this.plantHistory = data;
  //   });

  //   setInterval(this.getLiveStats, 1500);

  //   setInterval(this.getPlantHistory, 10000);
  

  // @action renderLiveStats = async () => {
  //   let currentStats = await Axios.get(
  //     `http://localhost:2805/sensorLive/5cf7bd6aa515a24d1c86a6f5`
  //   );
  //   this.liveStats = currentStats.data[0]; 
  //   console.log(currentStats);
  //   console.log(this.liveStats);
    
  //   return this.liveStats
  // };

  // @action getLiveStats = () => {
  //   this.socket.emit(`plant_stats`);
  // };

  // @action getPlantHistory = () => {
  //   this.socket.emit(`plant_history`);
  // };

}
