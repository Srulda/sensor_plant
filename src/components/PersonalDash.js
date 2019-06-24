import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import CurrentPlantData from "./CurrentPlantData";
import Loading from "./Layout/Loading";
import "../style/personalDash.css";
import UserPlant from "./UserPlant";
import Axios from "axios";

@inject("user")
@observer
class PersonalDash extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      currentStats: {},
      plantName: "",
      active: false,
      userSensors : []
    };
  }

  componentDidMount = async () => {
    let userID = JSON.parse(sessionStorage.getItem("userID"));
    this.props.user.getUserPlants(userID)
    this.getUserSensorsFromDB(userID)
    this.setState({
      loading: false
    });
  };

  getUserSensorsFromDB = async (userID) =>{
    let sensors = await Axios.get(`http://localhost:2805/user/sensors/${userID}`)
    
    this.setState({
      userSensors : sensors.data
    })
    // return sensors
  }

  renderLiveStats = async () => {
    let plantId = sessionStorage.getItem("plantID");
    if (plantId === undefined) {
      return;
    } else {
      let stats = await Axios.get(
        `http://localhost:2805/sensorLive/${plantId}`
      );
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
    let userID = JSON.parse(sessionStorage.getItem("userID"));
    let plantId = ID;
    let plant = this.props.user.userPlants.find(p => plantId === p._id);
    sessionStorage.setItem("plantID", plantId);
    console.log(userID)
    console.log(plantId)
    
    this.props.user.conncetPlantToSensor(userID, plantId, "7");
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

    let userID = JSON.parse(sessionStorage.getItem("userID"));
    this.props.user.disconnectPlantFromSensor(userID, plantId);

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
                  sensors = {this.state.userSensors}
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
