import { observable } from "mobx";

export class Plant {
  @observable name;
  @observable isActive = false;
  constructor(name, img) {
    this.name = name;
    this.img = img
  }
}
