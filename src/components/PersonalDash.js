import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import CurrentPlantData from "./CurrentPlantData";
import Loading from "./Layout/Loading";
import "../style/personalDash.css";
import UserPlant from "./UserPlant";
import Axios from "axios";

@inject("plantsStore", "user")
@observer
class PersonalDash extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      currentStats: {},
      plantName: "",
      active: false
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
        currentStats: stats.data
      });
    }
  };

  interval = () => {
    this.int = setInterval(async () => {
      await this.renderLiveStats();
    }, 1000);
  };

  connect = ID => {
    let user = JSON.parse(sessionStorage.getItem("currentLogin"));
    let plantId = ID;
    let plant = this.props.user.userPlants.find(p => plantId === p._id);
    sessionStorage.setItem("plantID", plantId);
    this.props.user.conncetPlantToSensor(user.user_id, plantId, "7");
    this.setState({
      plantName: plant.name,
      active: true
    });
    setTimeout(() => {
      this.interval();
    }, 500);
  };

  disconnect = ID => {
    clearInterval(this.int);
    let plantId = ID;
    let user = JSON.parse(sessionStorage.getItem("currentLogin"));
    this.props.user.disconnectPlantFromSensor(user.user_id, plantId);
  };

  render() {
    const loading = this.state.loading;
    const userPlants = this.props.user.userPlants;
    const active = this.state.active;

    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className="user-dashboard">
            {active ? (
              <CurrentPlantData
                currentStats={this.state.currentStats}
                plantName={this.state.plantName}
              />
            ) : (
              <div>Connect your plant to a sensor</div>
            )}
            <div className="user-plants-container">
              {userPlants.map(p => (
                <UserPlant
                  key={p._id}
                  id={p._id}
                  name={p.name}
                  connect={this.connect}
                  disconnect={this.disconnect}
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
