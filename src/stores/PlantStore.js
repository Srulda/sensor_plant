import { observable } from "mobx";

export class Plant {
  @observable name;

  // @observable completed = false
  constructor(name) {
    this.name = name;
  }
}
