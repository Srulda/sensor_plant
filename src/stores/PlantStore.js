import { observable } from "mobx";

export class Plant {
  @observable name;
  @observable isActive = false;
  constructor(name, id) {
    this.name = name;
    this.img = img;
  }
  

}
