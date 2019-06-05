import { observable } from "mobx";

export class Plant {
  @observable name;
  @observable isActive = false;
  constructor(name) {
    this.name = name;
  }
}
