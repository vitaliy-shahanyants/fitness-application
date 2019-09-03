import React from 'react';
import axios from 'axios';
import Querystring from 'querystring';
import ReactPaginate from 'react-paginate';
import FormData from 'form-data'

const initialState = {
  routine_name:'',
  public:'public',
  day_of_week:'sunday',
  exercise:{},
  addedExercises:[],
  routineCreated:false,
  routineCreatedError:false,
}
export default class CreateWorkoutRoutine extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.updateExercise = this.updateExercise.bind(this);
    this.addExercises = this.addExercises.bind(this);
    this.removeExercise = this.removeExercise.bind(this);
    this.createRoutine = this.createRoutine.bind(this);
    this.createConnectRoutineToExercise = this.createConnectRoutineToExercise.bind(this);
  }
  createRoutine(){
    let data = new FormData();
    data.append('routine_name',this.state.routine_name);
    data.append('public',this.state.public);
    data.append('day_of_week',this.state.day_of_week);
    axios.post(window.pageURL+'onCreateRoutine',data).then((res)=>{
      if(res.data != false){
        for(var i = 0; i <this.state.addedExercises.length;i++ ){
          this.createConnectRoutineToExercise(res.data,this.state.addedExercises[i].id);
        }
        this.setState({routineCreated:true});
      }else{
        this.setState({routineCreatedError:true,routineCreated:false});
      }
    });
  }
  createConnectRoutineToExercise(id,exeID){
    let data = new FormData();
    data.append('id',id);
    data.append('exeID',exeID);
    axios.post(window.pageURL+'onCreateConnectRoutineToExercise',data).then((res)=>{
    });
  }
  removeExercise(i){
    var addedExercises = this.state.addedExercises;
    addedExercises.splice(i,1);
    this.setState({
      addedExercises:addedExercises});
  }
  addExercises(){
    var addedExercises = this.state.addedExercises;
    addedExercises.push(this.state.exercise);
    this.setState({
      addedExercises:addedExercises});
  }
  updateExercise(val){
    this.setState({exercise:val})
  }
  render(){
    return(
      <div>
        {
          this.state.routineCreated ? <h4 style={{color:'white',
          backgroundColor:'green'}}>Created Routine</h4>:''
        }
        {
          this.state.routineCreatedError ? <h4 style={{color:'white',
          backgroundColor:'red'}}>Sorry! There was an error creating the routine,
          or this routine name already exists</h4>:''
        }

        <h1 className="text-center">Create New Workout Routine</h1>
        <div className="container">
          <div className="form">
            <div className="form-group">
              <label htmlFor="routine_name"><strong>Name of your Routine</strong></label>
              <input type="text" className="form-control" id="routine_name" onChange={(e)=>{
                  this.setState({routine_name:e.target.value});
              }}  value={this.state.routine_name}/>
              <label>
                <input type="radio"
                   value="public"
                   onChange={(e)=>{this.setState({public:e.target.value})}}
                   checked={this.state.public == 'public'} />
                 Public
               </label>
                &nbsp; &nbsp;
               <label>
                 <input type="radio"
                    value="private"
                    onChange={(e)=>{this.setState({public:e.target.value})}}
                    checked={this.state.public == 'private'} />
                  Private
                </label>
            </div>
            <div className="form-group">
              <label htmlFor="day_of_week"><strong>Choose a Day of the Week</strong></label>
              <select className="form-control" onChange={(e)=>{
                  this.setState({day_of_week:e.target.value});
                }}>
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
              </select>
            </div>
            <div className="form-group">
              <label><strong>Choose an Exercise</strong></label>
              <ChooseExercise updateExercise={this.updateExercise} />
              <br />
            <button onClick={(e)=>{this.addExercises()}} className="btn btn-primary">Add</button> &nbsp;OR &nbsp;
              <button onClick={(e)=>{
                window.location.href = pageURL+"createExercise";
              }} className="btn btn-primary">Create Exercise</button>
            </div>
          </div>
          <TableOFExecrises exercises={this.state.addedExercises}
          removeExercise={this.removeExercise} />
          <button onClick={(e)=>{
              this.createRoutine();
            }} className="btn btn-primary pull-right">Create Routine</button>
        </div>

        <br />
      </div>
    )
  }
}

class ChooseExercise extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedExercise:{},
      exercises:[]
    }
    this.getExercises = this.getExercises.bind(this);
    this.getExercises();
  }
  getExercises(){
    axios.get(window.pageURL+'onGetExercise').then((res)=>{
      if(res.data != false){
        this.setState({exercises:res.data});
      }
    });
  }
  render(){
    return(
        <select className="form-control" onChange={(e)=>{
          const choice = e.target.value.split(',');
          this.props.updateExercise({exercise_name:choice[0],id:choice[1],exercise_type:choice[2]});
        }}>
          <option value="choose_one">--Choose One--</option>
          {this.state.exercises.map((val,i)=>{
            return(<option value={val.exercise_name+","+val.id+","+val.exercise_type} key={i}>{val.exercise_name} ({val.exercise_type})</option>)
          })}
        </select>
    );
  }
}

class TableOFExecrises extends React.Component{
  constructor(props){
    super(props);
    this.capitalizeFirstChar = this.capitalizeFirstChar.bind(this);
  }
  capitalizeFirstChar(string) {
     return string.charAt(0).toUpperCase() + string.slice(1);
  }
  render(){
    return(
      <div>
        <div className="row">
          <div className="col-md-4">
            <strong>Exercise</strong>
          </div>
          <div className="col-md-4">
            <strong>Muscle</strong>
          </div>
          <div className="col-md-4">
          </div>
        </div>
        {this.props.exercises.map((val,i)=>{
          return(
            <div key={i} className="row">
              <div className="col-md-4">
                {this.capitalizeFirstChar(val.exercise_name)}
              </div>
              <div className="col-md-4">
                {this.capitalizeFirstChar(val.exercise_type)}
              </div>
              <div className="col-md-4">
                <button
                  onClick={(e)=>{
                    this.props.removeExercise(i)
                  }} className="btn btn-primary">Remove</button>
              </div>
            </div>
          )
        })}
      </div>

    )
  }
}
