import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import CurrentPlantData from "./CurrentPlantData";
import Loading from "./Layout/Loading";
import "../style/personalDash.css";
import UserPlant from "./UserPlant";
import Axios from "axios";

@inject("itemStore", "plantsStore", "user")
@observer
class PersonalDash extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      statsistics: {}
    };
  }

  componentDidMount = async () => {
    this.setState({
      loading: false
    });
  };

  renderLiveStats = async () => {
    let plantId = sessionStorage.getItem("plantID")
if(plantId === undefined){
  return
}else{
  let currentStats = await Axios.get(
    `http://localhost:2805/sensorLive/${plantId}`
  );
  this.setState({
    statsistics: currentStats.data[0]
    });
  }
};

  interval = () => {
    setInterval(async () => {
      await this.renderLiveStats();
    }, 5000);
  };

  connect = e => {
    let user = JSON.parse(sessionStorage.getItem("currentLogin"));
    let plantId = e.target.id
    sessionStorage.setItem("plantID", plantId)
    let plantStore = this.props.plantsStore;
    let txt_target = e.target.textContent;

    this.props.user.conncetPlantToSensor(user.user_id, plantId);
        
        
    // plantStore.getPlantMaxTemp(txt_target);
    // plantStore.getPlantMinTemp(txt_target);
    // plantStore.getPlantMaxHumid(txt_target);
    // plantStore.getPlantMinHumid(txt_target);
    // plantStore.getPlantMaxMoist(txt_target);
    // plantStore.getPlantMinMoist(txt_target);

    setTimeout(() => {
      this.interval();
    }, 2000);
  };

  render() {
    const loading = this.state.loading;
    const userPlants = this.props.user.myPlants;
    
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className="user-dashboard">
            <CurrentPlantData statsistics = {this.state.statsistics} />
            <div className="myPlants-container">
              {userPlants.map(p => (
                <UserPlant
                  key={p._id}
                  name={p.name}
                  connect={this.connect}
                  id={p._id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PersonalDash;
