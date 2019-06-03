import { observable, action } from "mobx";
import Plant from "../components/Plant";

export class UserStore {
  @observable myPlants = [];
  @observable userName;

  @action addPlant = plantName => {
    let newPlant = new Plant(plantName);
    console.log(`created new plant ${plantName}`);

    this.myPlants.push(newPlant);
    console.log(this.myPlants);
  };
}
