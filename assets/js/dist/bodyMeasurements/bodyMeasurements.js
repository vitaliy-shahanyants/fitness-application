import React from 'react';
import axios from 'axios';
import FormData from 'form-data';
import BodyFat from './bodyFat.js';
import Bmi from './bmi.js';

const initialState = {
  bodyFatTab:true,
  BMITab:false,
}


export default class BodyMeasurements extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
  }
  render(){
    return(
      <div className="container">
        <h1>Body Measurements</h1>
        <div className="row">
          <ul className="nav nav-tabs">
            <li>
              <span className={"nav-link " + (this.state.bodyFatTab ? 'active' :'')}
                onClick={()=>{
                  this.setState({
                    bodyFatTab:true,
                    BMITab:false,
                    heartRateTab:false,
                  });
                }}>Body Fat</span>
            </li>
            <li>
              <span className={"nav-link " + (this.state.BMITab ? 'active' :'')}
                onClick={()=>{
                  this.setState({
                    bodyFatTab:false,
                    BMITab:true,
                    heartRateTab:false,
                  });
                }}>Body Mass Index</span>
            </li>
          </ul>
        </div>
        <br />
        {this.state.bodyFatTab ? <BodyFat />:''}
        {this.state.BMITab ? <Bmi />:''}
      </div>
    )
  }
}
