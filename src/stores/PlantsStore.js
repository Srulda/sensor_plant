import { observer, inject } from "mobx-react";
import Axios from "axios";

export class Plants {
  @observable plants = [];

  getDataFromDB = async () => {
    let plants = await Axios.get(`http://localhost:2000/plants`);
    return plants.data;
  };
}
