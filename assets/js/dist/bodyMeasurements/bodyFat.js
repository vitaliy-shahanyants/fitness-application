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
  measure_type:'imperial',
  body_fat:0,
}
export default class BodyFat extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.getBodyDetail = this.getBodyDetail.bind(this);
    this.getBodyDetail();
  }
  getBodyDetail(){
    axios.post(window.pageURL+"getBodyDetail").then((res)=>{

      this.setState(res.data);
    })
  }
  componentWillReceiveProps(nextProps){}
  render(){
    console.log(this.state.measure_type);
    return(
      <div>
        <div className="row">
          <div className="form-group row">
            <label className="col-6 col-form-label">Unit Of Measurement</label>
            <div className="col-6">
              <select className="form-control"
                value={this.state.measure_type}
                onChange={(e)=>{
                  let weight;
                  if(e.target.value == 'imperial'){
                    weight = this.state.body_weight * 2.20462;
                  }else{
                    weight = this.state.body_weight * 0.45359
                  }
                  this.setState({measure_type:e.target.value,
                    weight_type:(e.target.value == 'metric' ? 'kg':'lb'),
                    body_weight:weight,
                  });
                }}>
                  <option value="imperial">Imperial</option>
                  <option value="metric">Metric</option>
              </select>
            </div>
          </div>
          <div className="col-2">
            <strong>Gender</strong>
          </div>
          <div className="col-2">
            <div className="form-group">
              <input type="text" disabled
                value={this.state.gender}
                className="form-control"/>
            </div>
          </div>
          <div className="col-8">
            <div className="form-group row">
              <label className="col-2 col-form-label">
                <strong>Weight</strong>
              </label>
              <div className="col-8">
                <input className="form-control"
                  value={this.state.body_weight}
                  onChange={(e)=>{
                    this.setState({body_weight:e.target.value});
                  }}
                  type="number" />
              </div>
              <div className="col-2">
                <select
                  className="form-control"
                  value={(this.state.measure_type == "metric" ? 'kg':'lb')}
                  onChange={(e)=>{
                    let weight;
                    if(e.target.value == 'kg'){
                      weight = this.state.body_weight * 0.453592
                    }else{
                      weight = this.state.body_weight * 2.20462;
                    }
                    this.setState({
                      weight_type:e.target.value,
                      body_weight:weight,
                      measure_type:(e.target.value == 'kg' ? 'metric':'imperial'),
                    })

                  }}>
                  <option value="lb">lb</option>
                  <option value="kg">kg</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {this.state.measure_type == 'metric' ? <Metric measurements={this.state} />:''}
        {this.state.measure_type == 'imperial' ? <Imperial measurements={this.state} />:''}
      </div>
    )
  }
}
class Metric extends React.Component{
  constructor(props){
    super(props);
    this.state = props.measurements;
    this.recordBodyMeasure = this.recordBodyMeasure.bind(this);
    this.calculateBodyFatForMale = this.calculateBodyFatForMale.bind(this);
    this.calculateBodyFatForFemale = this.calculateBodyFatForFemale.bind(this);
  }
  recordBodyMeasure(){
    let data = new FormData();
    let bodyFat = 0;
    if(this.state.gender == 'Male'){
      bodyFat = this.calculateBodyFatForMale();
    }else{
      bodyFat = this.calculateBodyFatForFemale();
    }
    data.append('height',this.state.height);
    data.append('weist',this.state.weist);
    data.append('neck',this.state.neck);
    data.append('hip',this.state.hip);
    data.append('measure_type',this.state.measure_type);
    data.append('body_fat',bodyFat);
    data.append('body_weight',this.state.body_weight);
    data.append('weight_type',this.state.weight_type);

    axios.post(window.pageURL+"recordBodyMeasure",data).then((res)=>{
      this.setState({body_fat:bodyFat});
    })
  }
  calculateBodyFatForMale(){
    console.log(parseFloat( parseFloat(this.state.hip)));
    let bodyFat = 86.010 * Math.log10((parseFloat(this.state.weist) + parseFloat(this.state.hip) ) - parseFloat(this.state.neck) )
    - 70.041 *  Math.log10(parseFloat(this.state.height)*12) + 36.76;
    console.log("Fate:"+bodyFat);
    return bodyFat;
  }
  calculateBodyFatForFemale(){
    let bodyFat = 86.010 * Math.log10((parseFloat(this.state.weist) + parseFloat(this.state.hip) ) - parseFloat(this.state.neck) )
    - 70.041 *  Math.log10(parseFloat(this.state.height)*12) + 36.76;
    return bodyFat;
  }
  componentWillReceiveProps(nextProps){
    this.setState(nextProps.measurements);
  }
  render(){
    return(
      <div>
        <div className="form-group row">
          <label className="col-2 col-form-label">
            <strong>Height</strong>
          </label>
          <div className="col-4">
            <input className="form-control" type="number"
            value={this.state.height*30.48}
            onChange={(e)=>{
              this.setState({height:e.target.value/30.48})
            }}/>
          </div>
          <div className="col-2">
            <strong>Centimeters</strong>
          </div>
          <div className="col-4">
            <strong>Body Fat Percentage:</strong> {Math.round(this.state.body_fat)}%
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label">
            <strong>Waist</strong>
          </label>
          <div className="col-8">
            <input className="form-control" type="number"
            value={this.state.weist*2.54}
            onChange={(e)=>{
              this.setState({weist:e.target.value/2.54})
            }}/>
          </div>
          <div className="col-2">
            <strong>Centimeters</strong>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label">
            <strong>Neck</strong>
          </label>
          <div className="col-8">
            <input className="form-control" type="number"
            value={this.state.neck*2.54}
            onChange={(e)=>{
              this.setState({neck:e.target.value/2.54})
            }}/>
          </div>
          <div className="col-2">
            <strong>Centimeters</strong>
          </div>
        </div>
        {this.state.gender == 'Female' ?
        <div className="form-group row">
          <label className="col-2 col-form-label">
            <strong>Hip</strong>
          </label>
          <div className="col-8">
            <input className="form-control" type="number"
            value={this.state.hip*2.54}
            onChange={(e)=>{
              this.setState({hip:e.target.value/2.54})
            }}/>
          </div>
          <div className="col-2">
            <strong>Centimeters</strong>
          </div>
        </div>
        :''}
        <div className="row">
          <button className="btn btn-primary"
            onClick={()=>{this.recordBodyMeasure()}}>Record</button>
        </div>
      </div>
    )
  }
}
class Imperial extends React.Component{
  constructor(props){
    super(props);
    this.state = props.measurements;
    this.recordBodyMeasure = this.recordBodyMeasure.bind(this);
    this.calculateBodyFatForMale = this.calculateBodyFatForMale.bind(this);
    this.calculateBodyFatForFemale = this.calculateBodyFatForFemale.bind(this);
  }
  recordBodyMeasure(){
    let data = new FormData();
    let bodyFat = 0;
    if(this.state.gender == 'Male'){
      bodyFat = this.calculateBodyFatForMale();
    }else{
      bodyFat = this.calculateBodyFatForFemale();
    }
    data.append('height',this.state.height);
    data.append('weist',this.state.weist);
    data.append('neck',this.state.neck);
    data.append('hip',this.state.hip);
    data.append('measure_type',this.state.measure_type);
    data.append('body_fat',bodyFat);
    data.append('body_weight',this.state.body_weight);
    data.append('weight_type',this.state.weight_type);
    axios.post(window.pageURL+"recordBodyMeasure",data).then((res)=>{
      this.setState({body_fat:bodyFat});
    })
  }
  calculateBodyFatForMale(){
    console.log(parseFloat( parseFloat(this.state.hip)));
    let bodyFat = 86.010 * Math.log10((parseFloat(this.state.weist) + parseFloat(this.state.hip) ) - parseFloat(this.state.neck) )
    - 70.041 *  Math.log10(parseFloat(this.state.height)*12) + 36.76;
    console.log("Fate:"+bodyFat);
    return bodyFat;
  }
  calculateBodyFatForFemale(){
    let bodyFat = 86.010 * Math.log10((parseFloat(this.state.weist) + parseFloat(this.state.hip) ) - parseFloat(this.state.neck) )
    - 70.041 *  Math.log10(parseFloat(this.state.height)*12) + 36.76;
    return bodyFat;
  }
  componentWillReceiveProps(nextProps){
    this.setState(nextProps.measurements);
  }
  render(){
    return(
      <div>
        <div className="form-group row">
          <label className="col-2 col-form-label">
            <strong>Height</strong>
          </label>
          <div className="col-4">
            <input className="form-control" type="number"
            value={this.state.height}
            onChange={(e)=>{
              this.setState({height:e.target.value})
            }}/>
          </div>
          <div className="col-2">
            <strong>Feet</strong>
          </div>
          <div className="col-4">
            <strong>Body Fat Percentage:</strong> {Math.round(this.state.body_fat)}%
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label">
            <strong>Waist</strong>
          </label>
          <div className="col-8">
            <input className="form-control" type="number"
            value={this.state.weist}
            onChange={(e)=>{
              this.setState({weist:e.target.value})
            }}/>
          </div>
          <div className="col-2">
            <strong>Inches</strong>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label">
            <strong>Neck</strong>
          </label>
          <div className="col-8">
            <input className="form-control" type="number"
            value={this.state.neck}
            onChange={(e)=>{
              this.setState({neck:e.target.value})
            }}/>
          </div>
          <div className="col-2">
            <strong>Inches</strong>
          </div>
        </div>
        {this.state.gender == 'Female' ?
        <div className="form-group row">
          <label className="col-2 col-form-label">
            <strong>Hip</strong>
          </label>
          <div className="col-8">
            <input className="form-control" type="number"
            value={this.state.hip}
            onChange={(e)=>{
              this.setState({hip:e.target.value})
            }}/>
          </div>
          <div className="col-2">
            <strong>Inches</strong>
          </div>
        </div>
        :''}
        <div className="row">
          <button className="btn btn-primary"
            onClick={()=>{this.recordBodyMeasure()}}>Record</button>
        </div>
      </div>
    )
  }
}
