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
      currentStats: {}
    };
  }

  componentDidMount = async () => {
    let user = JSON.parse(sessionStorage.getItem("currentLogin"));
    let userID = user.user_id;
    this.props.user.getUserPlants(userID);
    this.setState({
      loading: false
    });
  };

  renderLiveStats = async () => {
    let plantId = sessionStorage.getItem("plantID");
    if (plantId === undefined) {
      return;
    } else {
      let stats = await Axios.get(
        `http://localhost:2805/sensorLive/${plantId}`
      );
        console.log(stats.data);
        
      this.setState({
         currentStats : stats.data
      });
    }
  };

  interval = () => {
    setInterval(async () => {
      await this.renderLiveStats();
    }, 1500);
  };

  connect = async e => {
    let user = JSON.parse(sessionStorage.getItem("currentLogin"));
    let plantId = await e.target.id;
    
    sessionStorage.setItem("plantID", plantId);
    // let plantStore = this.props.plantsStore;
    // let txt_target = e.target.textContent;

    this.props.user.conncetPlantToSensor(user.user_id, plantId, "7");

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
            <CurrentPlantData currentStats={this.state.currentStats} />
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
