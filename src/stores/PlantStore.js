import { observable } from "mobx";

export class Plant {
  @observable name;

  constructor(name) {
    this.name = name;
  }
}
