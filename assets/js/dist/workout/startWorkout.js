import React from 'react';
import axios from 'axios';
import FormData from 'form-data'

const initialState = {
  chosenWorkoutRotuineFlag:false,
  exercises:[],
  weight:0,
  routine_name:"",
  weight_type:"",
  workout_routine_id:0,
}
export default class StartWorkout extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.getCurrentWorkoutRoutine = this.getCurrentWorkoutRoutine.bind(this);
    this.getExercisesFprWorkoutRoutine = this.getExercisesFprWorkoutRoutine.bind(this);
    this.getCurrentWorkoutRoutine();
  }
  getCurrentWorkoutRoutine(){
    axios.get(window.pageURL+'getCurrentWorkoutRoutine').then((res)=>{
      if(res.data.length > 0){
        this.getExercisesFprWorkoutRoutine(res.data[0]);
      }else{
        this.setState({
          chosenWorkoutRotuineFlag:false,
        })
      }
    });
  }
  getExercisesFprWorkoutRoutine(data){
    let formdata = new FormData();
    formdata.append('id',data.id);
    axios.post(window.pageURL+'getExercisesFprWorkoutRoutine',formdata).then((res)=>{
      this.setState({
        routine_name:data.routine_name,
        weight:data.body_weight,
        weight_type:data.weight_type,
        chosenWorkoutRotuineFlag:true,
        exercises:res.data,
        workout_routine_id:data.id,
      });
    })
  }
  render(){
    return (
      <div className="container">
        {this.state.chosenWorkoutRotuineFlag ?
          <CurrentWorkoutRoutine initialState={this.state} />:
          <h3>No Current Workout Routine was Selected</h3>}
      </div>
    )
  }
}

class CurrentWorkoutRoutine extends React.Component{
  constructor(props){
    super(props);
    this.state = props.initialState;
    this.recordExercise = this.recordExercise.bind(this);
  }
  recordExercise(exercise){
    //exercise['workout_routine_id'] = this.state.workout_routine_id;
    //exercise['my_weight'] = this.state.weight;
    //exercise['my_weight_type'] = this.state.weight_type;
    let data = new FormData();
    data.append('workout_routine_id',this.state.workout_routine_id);
    data.append('my_weight',this.state.weight);
    data.append('my_weight_type',this.state.weight_type);
    data.append('exercise_name',exercise.exercise_name);
    data.append('exercise_id',exercise.exercise_id);
    data.append('id',exercise.exercise_id);
    data.append('sets',exercise.sets);
    data.append('reps',exercise.reps);
    data.append('weight',exercise.weight);
    data.append('weight_type',exercise.weight_type);
    data.append('cardio_incline',exercise.cardio_incline);
    data.append('exercise_type',exercise.exercise_type);
    axios.post(window.pageURL+'recordExerciseInWorkoutRoutine',data).then((res)=>{

    })
    console.log(exercise);
  }
  render(){
    return(
      <div className="container">
        <h1>Start Workout Workout Routine</h1>
        <div className="row">
          <div className="col-md-6">
            Workout Routine Name: <span style={{'color':'blue'}}>{this.state.routine_name}</span>
          </div>
          <div className="col-md-3">
            <div className="form-group row">
              <label className="col-5 col-form-label">Weight </label>
              <div className="col-7">
                <input type="number" className="form-control"
                value={this.state.weight} onChange={(e)=>{
                  this.setState({weight:e.target.value})
                }} />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <select className="form-control"
              value={this.state.weight_type} onChange={(e)=>{
                this.setState({weight_type:e.target.value});
              }}>
              <option value="lb">lb</option>
              <option value="kg">kg</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <strong>Workout Rotuine For Monday</strong>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <strong>Exercise Type</strong>
          </div>
          <div className="col-md-2">
            <strong>Exercise Name</strong>
          </div>
          <div className="col-md-2">
            <strong>Sets/Distance</strong>
          </div>
          <div className="col-md-2">
            <strong>Reps/Speed</strong>
          </div>
          <div className="col-md-2">
            <strong>Weight/Time</strong>
          </div>
          <div className="col-md-2">
            <strong>Weight Type/Incline</strong>
          </div>
          <div className="col-md-2">
          </div>
        </div>
        {this.state.exercises.map((val,i)=>{
            return(
              <div key={i} className="row">
                <div className="col-md-2">
                  {val.exercise_type}
                </div>
                <div className="col-md-2">
                  {val.exercise_name}
                </div>
                <div className="col-md-2">
                  {val.sets}
                </div>
                <div className="col-md-2">
                  {val.reps}
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <input type="text" className="form-control"
                      value={this.state.exercises[i].weight}
                      onChange={(e)=>{
                      var exercises = this.state.exercises;
                      exercises[i].weight = e.target.value;
                      this.setState({
                        exercises:exercises
                      })
                    }} />
                  </div>
                </div>
                <div className="col-md-1">
                  {val.weight_type}
                </div>
                <div className="col-md-2">
                  <button className="btn btn-primary"
                    onClick={(e)=>{
                      this.recordExercise(val)
                    }}>Record Exercise</button>
                </div>
              </div>
            )
        })}
      </div>
    )
  }
}
