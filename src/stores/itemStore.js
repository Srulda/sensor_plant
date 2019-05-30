import { observable} from "mobx";
import Axios from "axios";

export class ItemStore {
  @observable plants = [];

  getDataFromDB = async () => {
    let data = await Axios.get(`http://localhost:2805/myPlants`);
    this.plants = data.data
    
    return data.data;
  };

}
