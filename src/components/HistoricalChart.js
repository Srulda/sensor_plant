import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import "../style/chart.css";
import moment from "moment";
@inject("itemStore")
@observer
class HistoricalChart extends Component {
  constructor() {
    super();
    this.state = {
      parameter: "tempeture"
    };
  }

  componentDidMount = () => {
    this.props.itemStore.getPlantHistory();
  };

  makeParameter = () => {
    let param = "";
    if (this.state.parameter === "tempeture") {
      param = "avgTemp";
    } else if (this.state.parameter === "humadity") {
      param = "avgHum";
    } else if (this.state.parameter === "moiste") {
      param = "avgMos";
    }
    return param;
  };

  makeTempChart = () => {
    let tempData = this.props.itemStore.plantHistory.map(d => ({
      parameter: d[this.makeParameter()],
      time: moment(
        `${d._id.year}/${d._id.month}/${d._id.day} ${d._id.hour}:${
          d._id.minute
        }`
      ).format("LT")
    }));
    return tempData;
  };

  handleInput = e => {
    const target = e.target;
    const value = target.value;
    this.setState({ parameter: value });
  };
  render() {
    return (
      <div className="temp-by-temp-by-time">
        <h3>{this.state.parameter} over time</h3>
        <select onChange={this.handleInput} value={this.state.paramter}>
          <option>tempeture</option>
          <option>humadity</option>
          <option>moiste</option>
        </select>
        <LineChart
          width={500}
          height={300}
          data={this.makeTempChart()}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="parameter" stroke="#82ca9d" />
        </LineChart>
      </div>
    );
  }
}

export default HistoricalChart;
