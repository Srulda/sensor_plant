import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import {LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';


@inject("itemStore")
@observer

class TempOverTime extends Component {
    constructor(){
        super()
        this.state ={
            parameter: "tempeture"
        }
    }

    makeParameter = () =>{
        let param = ""
        if(this.state.parameter === "tempeture"){
                param = "c"
        }else if(this.state.parameter === "humadity"){
            param = "h"
        }else if(this.state.parameter === "moiste"){
            param = "m"
        }
        return param
    }
    componentDidMount = () =>{
        this.props.itemStore.getDataFromDB()
    }
    makeTempChart = () =>{
        
        let tempData =this.props.itemStore.plants.map(d=> ({parameter: d[this.makeParameter()],
             time: d.timestamp.split("T")[1]}))
        return tempData
    }

    handleInput = (e) => {
        const target = e.target
        const value =target.value;
        this.setState({parameter : value})
      }
    render() { 
        return(
            <div className="temp-by-temp-by-time">
            <h3>{this.state.parameter} over time</h3>
            <select  onChange={this.handleInput}  value={this.state.paramter} >
                    <option>tempeture</option>
                    <option>humadity</option>
                    <option>moiste</option>
                    
                </select>
<LineChart
     width={300}
     height={150}
     data={this.makeTempChart()}
              margin={{
       top: 5, right: 30, left: 20, bottom: 5,
     }}
  >
     <XAxis dataKey="time" />
     <YAxis />
     <Tooltip />

     <Line type="monotone" dataKey="parameter" stroke="#82ca9d" />
     </LineChart>
</div>

        )
    }
}
 
export default TempOverTime;