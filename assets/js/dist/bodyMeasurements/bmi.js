import React from 'react';
import axios from 'axios';
import FormData from 'form-data';
const initialState = {
  gender:'male',
  body_weight:'',
  weight_type:'',
  height:0,
  weist:0,
  hip:0,
  neck:0,
  measure_type:'metric',
  body_fat:0,
  mass_index:0
}
export default class Bmi extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.getBodyBMI = this.getBodyBMI.bind(this);
    this.calculateBMI = this.calculateBMI.bind(this);
    this.getBodyBMI();
  }
  calculateBMI(){
    let data = new FormData();
    let bmi = 703*(parseFloat(this.state.body_weight) /(Math.pow(parseFloat(this.state.height)*12,2 ) ) );
    data.append('height',this.state.height);
    data.append('body_weight',this.state.body_weight);
    data.append('weight_type',this.state.weight_type);
    data.append('mass_index',bmi);

    axios.post(window.pageURL+"recordBodyMass",data).then((res)=>{
      this.setState({mass_index:bmi});
    })


  }
  getBodyBMI(){
    axios.post(window.pageURL+"getBodyBMI").then((res)=>{
      this.setState(res.data);
    })
  }
  componentWillReceiveProps(nextProps){

  }
  render(){
    return(
      <div className="">
        <div className="form-group row">
          <label className="col-2 col-form-label">
            <strong>Weight</strong>
          </label>
          <div className="col-6">
            <input className="form-control"
              value={this.state.body_weight}
              onChange={(e)=>{
                this.setState({body_weight:e.target.value});
              }}
              type="number" />
          </div>
          <div className="col-4">
            <select
              className="form-control"
              value={this.state.weight_type}
              onChange={(e)=>{
                this.setState({
                  weight_type:e.target.value,
                })

              }}>
              <option value="lb">lb</option>
              <option value="kg">kg</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label">
            <strong>Height</strong>
          </label>
          <div className="col-6">
            <input className="form-control" type="number"
            value={this.state.height}
            onChange={(e)=>{
              this.setState({height:e.target.value})
            }}/>
          </div>
          <div className="col-4">
            <strong>Feet</strong>
          </div>
        </div>
        <div className="row">
          <button className="btn btn-primary"
            onClick={(e)=>{
              this.calculateBMI();
            }}>Calculate</button>
        </div>
        <div className="row">
          <h5>Your BMI is: {this.state.mass_index}</h5>
        </div>
      </div>
    )
  }
}
