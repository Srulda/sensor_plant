import { observable, action } from "mobx";

export class GeneralStore {
  @observable name;
  @observable loading = true;

  @action handleInput = (name, value) => {
    this[name] = value;
  };

  
}
