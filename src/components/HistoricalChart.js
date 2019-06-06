import React, { Component } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import "../style/chart.css";
import Axios from "axios";

class HistoricalChart extends Component {
  constructor() {
    super();
    this.state = {
      parameter: "tempeture",
      statsistics: [],
      chartData : []
    };
  }

  componentDidMount = () => {
    this.renderLiveStats();
    // setInterval(async () => {
    //   await this.renderLiveStats();
    // }, 10000);
  };

  renderLiveStats = async () => {
    let user = JSON.parse(sessionStorage.getItem("currentLogin"))
    let plantId = JSON.parse(sessionStorage.getItem("plantId"))
    // let plantId = user.plants[0];
    let currentStats = await Axios.get(
      `http://localhost:2805/sensorHistory/${plantId}`
    );
    console.log(currentStats);
    
    this.setState({
      statsistics: currentStats.data
    }, () => {
      this.makeTempChart()
    });
    
  };

  makeParameter = () => {
    let param = "";
    if (this.state.parameter === "tempeture") {
      param = "c";
    } else if (this.state.parameter === "humadity") {
      param = "h";
    } else if (this.state.parameter === "moiste") {
      param = "m";
    }
    return param;
  };

  makeTempChart = async () => {
    let tempData = await this.state.statsistics.map(d => ({
      parameter: d[this.makeParameter()],
      time: d.timestamp.split("T")[1]
    }));
    console.log(tempData);
    this.setState({
      chartData : tempData
    })
  };

  handleInput = e => {
    const target = e.target;
    const value = target.value;
    console.log(target, value);
    this.setState({ parameter: value });
  };
  render() {
  
    return (
      <div className="temp-by-temp-by-time">
        <h3>{this.state.parameter} over time</h3>
        <select onChange={this.handleInput} value={this.state.parameter}>
          <option>tempeture</option>
          <option>humadity</option>
          <option>moiste</option>
        </select>
        <LineChart
          width={500}
          height={250}
          data={this.chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="parameter" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="parameter" stroke="#82ca9d" />
        </LineChart>
      </div>
    );
  }
}

export default HistoricalChart;
