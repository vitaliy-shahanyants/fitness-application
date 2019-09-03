import React from 'react';
import axios from 'axios';
import Querystring from 'querystring';
import ReactPaginate from 'react-paginate';
import FormData from 'form-data'

const initialState = {
    exercise_type:'chest',
    exercise_name:'',
    exercise_sets:0,
    exercise_reps:'4-6',
    exercise_weight:0,
    exercise_weight_type:'lb',
    created:false,

    cardio_distance:0,
    cardio_type:'km',
    cardio_speed:0,
    cardio_speed_type:'km',
    cardio_time:0,
    cardio_incline:0,
}

export default class CreateExercise extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.onCreateExercise = this.onCreateExercise.bind(this);
    this.onCreateCardio = this.onCreateCardio.bind(this);
  }
  onCreateCardio(){
    let data = new FormData();
    data.append('exercise_type',this.state.exercise_type);
    data.append('exercise_name',this.state.exercise_name);
    data.append('cardio_distance',this.state.cardio_distance);
    data.append('cardio_distance_type',this.state.cardio_type);
    data.append('cardio_speed',this.state.cardio_speed);
    data.append('cardio_speed_type',this.state.cardio_type);
    data.append('cardio_time',this.state.cardio_time);
    data.append('cardio_incline',this.state.cardio_incline);
    axios.post(window.pageURL+'onCreateCardio',data).then((res)=>{
      if(res.data){
        this.setState({created:true});
      }
    });
  }
  onCreateExercise(){
    let data = new FormData();
    data.append('exercise_type',this.state.exercise_type);
    data.append('exercise_name',this.state.exercise_name);
    data.append('exercise_sets',this.state.exercise_sets);
    data.append('exercise_reps',this.state.exercise_reps);
    data.append('exercise_weight',this.state.exercise_weight);
    data.append('exercise_weight_type',this.state.exercise_weight_type);
    axios.post(window.pageURL+'onCreateExercise',data).then((res)=>{
      if(res.data){
        this.setState({created:true});
      }
    });
  }
  render(){
    return (
      <div>
        <h1 className="text-center">
          Create Exercise
        </h1>
        {this.state.created ?
          <h5 className="text-center" style={{color:'white',backgroundColor:'green'}}>Exercise Created</h5>:''}
          <div className="container">
            <div className="form-group">
              <label><strong>Exercise Type</strong></label>
              <select className="form-control" onChange={(e)=>{
                  this.setState({exercise_type:e.target.value});
                }}>
                <option value="chest">Chest</option>
                <option value="shoulders">Shoulders</option>
                <option value="back">Back</option>
                <option value="biceps">Biceps</option>
                <option value="triceps">Triceps</option>
                <option value="abs">Abs</option>
                <option value="Leg">leg</option>
                <option value="glutes">Glutes</option>
                <option value="cardio">Cardio</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                <strong>Exercise Name</strong>
              </label>
              <input type="text" className="form-control" onChange={(e)=>{
                  this.setState({exercise_name:e.target.value});
                }} value={this.state.exercise_name} />
            </div>
          {this.state.exercise_type == 'cardio' ?
          <div className="form">
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                <strong>Distance</strong>
              </label>
              <div className="col-sm-6">
                <input type="number" className="form-control" onChange={(e)=>{
                    this.setState({cardio_distance:e.target.value});
                  }} value={this.state.cardio_distance} />
              </div>
              <div className="col-sm-4">
                <select value={this.state.cardio_type} className="form-control" onChange={(e)=>
                    {this.setState({cardio_type:e.target.value})}}>
                  <option  value="km">
                    Kilometers
                  </option>
                  <option  value="mph">
                    Mile
                  </option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                <strong>Speed</strong>
              </label>
              <div className="col-sm-6">
                <input type="number" className="form-control" onChange={(e)=>{
                    this.setState({cardio_speed:e.target.value});
                  }} value={this.state.cardio_speed} />
              </div>
              <div className="col-sm-4">
                <select value={this.state.cardio_type} className="form-control" onChange={(e)=>
                    {this.setState({cardio_type:e.target.value})}}>
                  <option  value="km">
                    Kilometers
                  </option>
                  <option  value="mph">
                    Mile
                  </option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                <strong>Time</strong>
              </label>
              <div className="col-sm-6">
                <input type="number" className="form-control" onChange={(e)=>{
                    this.setState({cardio_time:e.target.value});
                  }} value={this.state.cardio_time} />
              </div>
              <div className="col-sm-4">
                <strong>Minutes</strong>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">
                <strong>Incline (intensity level)</strong>
              </label>
              <div className="col-sm-6">
                <input type="number" className="form-control" onChange={(e)=>{
                    this.setState({cardio_incline:e.target.value});
                  }} value={this.state.cardio_incline} />
              </div>
            </div>
            <button className="btn btn-primary pull-right" onClick={(e)=>{this.onCreateCardio()}}>
              Create Exercise
            </button>
          </div>
          :
            <div className="form">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  <strong>Sets</strong>
                </label>
                <div className="col-sm-6">
                  <input type="number" className="form-control" onChange={(e)=>{
                      this.setState({exercise_sets:e.target.value});
                    }} value={this.state.exercise_sets} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  <strong>Reps</strong>
                </label>
                <div className="col-sm-6">
                  <select className="form-control" onChange={(e)=>{
                      this.setState({exercise_reps:e.target.value});
                    }}>
                    <option value="4-6">
                      4-6
                    </option>
                    <option value="6-8">
                      6-8
                    </option>
                    <option value="8-10">
                      8-10
                    </option>
                    <option value="10-12">
                      10-12
                    </option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">
                  <strong>Weight</strong>
                </label>
                <div className="col-sm-6">
                  <input type="number" className="form-control" onChange={(e)=>{
                      this.setState({exercise_weight:e.target.value});
                    }} value={this.state.exercise_weight} />
                </div>
                <div className="col-sm-4">
                  <select className="form-control" onChange={(e)=>{
                      this.setState({exercise_weight_type:e.target.value});
                    }}>
                    <option value="lb">
                      lb
                    </option>
                    <option value="kg">
                      kg
                    </option>
                  </select>
                </div>
              </div>
              <button className="btn btn-primary pull-right" onClick={(e)=>{this.onCreateExercise()}}>
                Create Exercise
              </button>
            </div>
          }
        </div>
      </div>
    )
  }
}
