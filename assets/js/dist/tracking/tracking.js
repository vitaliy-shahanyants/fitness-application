import React from 'react';
import axios from 'axios';
import FormData from 'form-data';
import {Line} from 'react-chartjs-2';
const initialState = {
  filter:'workout',
  start_date:'',
  end_date:'',
  exercises:[],
  current_exercise:'',
  data:{
    labels:[],
    datasets:[],
  },
  body:[],
  body_measurments_type:'body_fat',
}

export default class Tracking extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
  }
  render(){
    return(
      <div className="container">
        <h1>Tracking Progress</h1>
        <div className="form-group row">
          <label className="col-2 col-form-label">Filter Tracker</label>
          <div className="col-10">
            <select className="form-control"
              value={this.state.filter}
              onChange={(e)=>{
                this.setState({
                  filter:e.target.value,
                })
              }}>
              <option value="workout">Workout</option>
              <option value="body_measurments">Body Measurments</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label">Start Date</label>
          <div className="col-4">
            <input className="form-control" type="date"
              value={this.state.start_date}
              onChange={(e)=>{
                this.setState({
                  start_date:e.target.value,
                });
              }}/>
          </div>
          <label className="col-2 col-form-label">End Date</label>
          <div className="col-4">
            <input className="form-control" type="date"
              value={this.state.end_date}
              onChange={(e)=>{
                this.setState({
                  end_date:e.target.value,
                })}}/>
          </div>
        </div>
        {this.state.filter == "workout" ?
        <FilterWorkout info={this.state}/>:
        <FilterBodyMeasurments info={this.state}/>}
      </div>
    )
  }
}

class FilterWorkout extends React.Component{
  constructor(props){
    super(props);
    this.state = props.info;
    this.trackingGetWorkoutRoutines = this.trackingGetWorkoutRoutines.bind(this);

    this.trackingGetWorkoutRoutines();
  }
  trackingGetWorkoutRoutines(){
    let data = new FormData();
    data.append('start_date',this.state.start_date);
    data.append('end_date',this.state.end_date);
    axios.post(window.pageURL+"trackingGetWorkoutRoutines",data).then((res)=>{

      this.setState({exercises:res.data,current_exercise:res.data[0].exercise_type});
    })
  }
  componentWillReceiveProps(nextProps){
    this.state = nextProps.info;
    this.trackingGetWorkoutRoutines();
  }
  componentWillUpdate(nextProps, nextState){
    let weight = [];
    nextState.data = {
        labels:[],
        datasets:[],
    };
    for(var i = 0; i < nextState.exercises.length; i++){
      if(nextState.exercises[i].exercise_type == nextState.current_exercise){
        nextState.data.labels.push(nextState.exercises[i].date);
        weight.push(parseFloat(nextState.exercises[i].weight));
      }
    }
    nextState.data.datasets.push({
      label:nextState.current_exercise,
      data:weight
    });
    this.state = nextState;
  }
  render(){
    return(
      <div>
        <div className="form-group row">
          <label className="col-2 col-form-label">Filter Tracker</label>
          <div className="col-10">
            <select className="form-control"
              value={this.state.current_exercise}
              onChange={(e)=>{
                this.setState({
                  current_exercise:e.target.value,
                })
              }}>
              {this.state.exercises.map((val,i)=>{
                return(
                  <option key={i} value={val.exercise_type}>{val.exercise_type}</option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="row">
          <Line
            data={this.state.data}
          />
        </div>
      </div>
    )
  }
}
class FilterBodyMeasurments extends React.Component{
  constructor(props){
    super(props);
    this.state = props.info;
  }
  render(){
    return(
      <div>
        <div className="form-group row">
          <label className="col-2 col-form-label">Choose Body Measurments</label>
          <div className="col-10">
            <select className="form-control"
              value={this.state.body_measurments_type}
              onChange={(e)=>{
                this.setState({
                  body_measurments_type:e.target.value,
                })
              }}>
              <option value="body_fat">Body Fat</option>
              <option value="bmi">Body Mass Index</option>
            </select>
          </div>
        </div>
        <FilterBodyMeasurmentsWithType info={this.state} />
      </div>
    )
  }
}
class FilterBodyMeasurmentsWithType extends React.Component{
  constructor(props){
    super(props);
    this.state = props.info;
    this.trackingGetBodyMeasurments = this.trackingGetBodyMeasurments.bind(this);

    this.trackingGetBodyMeasurments();
  }
  trackingGetBodyMeasurments(){
    let data = new FormData();
    data.append('body_measurments_type',this.state.body_measurments_type);
    data.append('start_date',this.state.start_date);
    data.append('end_date',this.state.end_date);
    axios.post(window.pageURL+"trackingGetBodyMeasurments",data).then((res)=>{
      this.setState({body:res.data});
    })
  }
  componentWillReceiveProps(nextProps){
    this.state = nextProps.info;
    this.trackingGetBodyMeasurments();
  }
  componentWillUpdate(nextProps, nextState){
    let bodeMeasure = [];
    nextState.data = {
        labels:[],
        datasets:[],
    };
    for(var i = 0; i < nextState.body.length; i++){
      nextState.data.labels.push(nextState.body[i].date);
      bodeMeasure.push(parseFloat(nextState.body[i].measure));
    }
    nextState.data.datasets.push({
      label:nextState.body_measurments_type,
      data:bodeMeasure
    });
    this.state = nextState;
  }
  render(){
    return(
      <div className="row">
        <Line
          data={this.state.data}
        />
      </div>
    )
  }
}
