import React from 'react';
import axios from 'axios';
import Querystring from 'querystring';
import ReactPaginate from 'react-paginate';
import FormData from 'form-data'

const initialState = {
  searh_muscle_type:'chest',
  filter:'routine_name',
  routine_name:'',
  update:false,
  updateID:0,
}
export default class AllWorkoutRoutines extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.updateWorkoutRoutine = this.updateWorkoutRoutine.bind(this);
  }
  updateWorkoutRoutine(id){
    this.setState({update:true,updateID:id});
  }
  render(){
    return(
      <div>
        {this.state.update ? <UpdateWorkoutRoutine updateID={this.state.updateID} />
        :
        <div>
          <h1 className="text-center">All Workout Routines</h1>
          <div className="container">
            <div className="form">
              <div className="form-group">
                <label>
                  <strong>Search Filter</strong>
                </label>
                <select
                  onChange={(e)=>{this.setState({filter:e.target.value})}}
                  className="form-control">
                  <option value="routine_name">
                    Routine Name
                  </option>
                  <option value="muscle_group">
                    Muscle Groups
                  </option>
                </select>
              </div>
              {this.state.filter == 'routine_name' ?
                <div className="form-group">
                  <label>
                    <strong>Search by Workout Routine Name</strong>
                  </label>
                  <input type="text"
                    className="form-control"
                    value={this.state.routine_name}
                    onChange={(e)=>{
                      this.setState({routine_name:e.target.value});
                    }} />
                    <br />
                </div>
                :
                <div className="form-group">
                  <label><strong>Search by muscle group</strong></label>
                  <select value={this.state.searh_muscle_type} className="form-control" onChange={(e)=>{
                      this.setState({searh_muscle_type:e.target.value});
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
                  <br />
                </div>
              }
              <ShowWorkoutRoutines
                routine_name={this.state.routine_name}
                filter={this.state.filter}
                searh_muscle_type={this.state.searh_muscle_type}
                updateWorkoutRoutine={this.updateWorkoutRoutine}
              />
            </div>
          </div>
        </div>}
      </div>
    )
  }
}

class UpdateWorkoutRoutine extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      allRoutines:{},
      allMuscleGroups:[],
      routine_name:'',
      public:null,
      day_of_week:'',
      routine_id:null,
      exercise:'',
      addedExercises:[],
    }

    this.getDefaultWorkoutRoutine = this.getDefaultWorkoutRoutine.bind(this);
    this.getMuscleGroups = this.getMuscleGroups.bind(this);
    this.updateRoutine = this.updateRoutine.bind(this);
    this.updateExercise = this.updateExercise.bind(this);
    this.addExercises = this.addExercises.bind(this);
    this.createConnectRoutineToExercise = this.createConnectRoutineToExercise.bind(this);
    this.destroyConnectRoutineToExercise = this.destroyConnectRoutineToExercise.bind(this);
    this.removeExercise = this.removeExercise.bind(this);
    this.getAllExercises = this.getAllExercises.bind(this);
    this.updateChosenExercise = this.updateChosenExercise.bind(this);
    this.getDefaultWorkoutRoutine();
  }
  getAllExercises(){
    let data = new FormData();
    data.append('id',this.state.routine_id);
    axios.post(window.pageURL+'getAllExercisesOfRotuine',data).then((res)=>{
      this.setState({addedExercises:res.data});
    });
  }
  updateExercise(val){
    this.setState({exercise:val})
  }
  addExercises(){
    this.createConnectRoutineToExercise(this.state.routine_id,this.state.exercise.id);
    var addedExercises = this.state.addedExercises;
    addedExercises.push(this.state.exercise);
    this.setState({
      addedExercises:addedExercises});
  }
  destroyConnectRoutineToExercise(ex_id){
    let data = new FormData();
    data.append('id',this.state.routine_id);
    data.append('exeID',ex_id);
    axios.post(window.pageURL+'onDestroyConnectRoutineToExercise',data).then((res)=>{
      this.getDefaultWorkoutRoutine();
    });
  }
  updateChosenExercise(i){
    console.log(this.state.addedExercises[i]);
    let data = new FormData();
    data.append('id',this.state.addedExercises[i].exercise_id);
    data.append('exercise_name',this.state.addedExercises[i].exercise_name);
    data.append('exercise_type',this.state.addedExercises[i].exercise_type);
    data.append('reps',this.state.addedExercises[i].reps);
    data.append('sets',this.state.addedExercises[i].sets);
    data.append('weight',this.state.addedExercises[i].weight);
    data.append('weight_type',this.state.addedExercises[i].weight_type);
    data.append('cardio_incline',this.state.addedExercises[i].cardio_incline);
    axios.post(window.pageURL+'updateExerciseInWorkoutRoutine',data).then((res)=>{
      this.getDefaultWorkoutRoutine();
    });
  }
  removeExercise(i){
    var addedExercises = this.state.addedExercises;
    addedExercises.splice(i,1);
    this.destroyConnectRoutineToExercise(this.state.addedExercises[i-1].id);
    this.setState({
      addedExercises:addedExercises});

  }
  createConnectRoutineToExercise(id,exeID){
    let data = new FormData();
    data.append('id',id);
    data.append('exeID',exeID);
    axios.post(window.pageURL+'onCreateConnectRoutineToExercise',data).then((res)=>{
    });
  }
  updateRoutine(){
    let data = new FormData();
    data.append('id',this.state.routine_id);
    data.append('day_of_week',this.state.day_of_week);
    data.append('public',this.state.public);
    data.append('routine_name',this.state.routine_name);
    axios.post(window.pageURL+'updateRoutine',data).then((res)=>{
      this.getDefaultWorkoutRoutine();
    });
  }
  getDefaultWorkoutRoutine(){
    let data = new FormData();
    data.append('id',this.props.updateID);
    axios.post(window.pageURL+'getSpecificRoutines',data).then((res)=>{
      this.getMuscleGroups(res.data.id,res.data);

    });
  }
  getMuscleGroups(id,allRoutines){
    let data = new FormData();
    data.append('id',id);
    axios.post(window.pageURL+'getMuscleGroups',data).then((res)=>{
      this.setState({
        allMuscleGroups:res.data,
        allRoutines:allRoutines,
        routine_name:allRoutines.routine_name,
        public:allRoutines.public,
        day_of_week:allRoutines.day_of_week,
        routine_id:allRoutines.id,
      });
      this.getAllExercises();
    });
  }
  render(){
    return (
      <div>
        <h1 className="text-center">
          Update Workout Routine
        </h1>
        <div className="container">
          <div className="form">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">
                Name of your Routine
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e)=>{this.setState({routine_name:e.target.value})}}
                  value={this.state.routine_name}/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-form-label">
                Public&nbsp;
              </label>
              <input type="radio"
                onChange={(e)=>{this.setState({public:'public'})}}
                checked={this.state.public == 'public'} />
              &nbsp; &nbsp; &nbsp; &nbsp;
              <label className="col-form-label">
                Private &nbsp;
              </label>
              <input type="radio"
                onChange={(e)=>{this.setState({public:'private'})}}
                checked={this.state.public == 'private'} />
            </div>
            <div className="form-group">
              <label htmlFor="day_of_week">
                <strong>Choose a Day of the Week</strong>
              </label>
              <select
                value={this.state.day_of_week}
                className="form-control"
                onChange={(e)=>{
                  this.setState({day_of_week:e.target.value});
                }}>
                <option value="sunday">
                  Sunday
                </option>
                <option value="monday">
                  Monday
                </option>
                <option value="tuesday">
                  Tuesday
                </option>
                <option value="wednesday">
                  Wednesday
                </option>
                <option value="thursday">
                  Thursday
                </option>
                <option value="friday">
                  Friday
                </option>
                <option value="saturday">
                  Saturday
                </option>
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
            <div className="form-group">
              <button
                className="btn btn-primary pull-right"
                onClick={(e)=>{this.updateRoutine()}}>
                Update Workout Routine
              </button>
            </div>
            <br />
            <br />
            <TableOFExecrises exercises={this.state.addedExercises}
            removeExercise={this.removeExercise}
            updateChosenExercise={this.updateChosenExercise} />
          </div>
        </div>
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
    this.state = {
      exercises:[]
    }
  }
  componentWillReceiveProps(nextProps){
    this.state ={
      exercises:nextProps.exercises,
    }
  }
  capitalizeFirstChar(string) {
     return string.charAt(0).toUpperCase() + string.slice(1);
  }
  render(){
    return(
      <div>
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
          <div className="col-md-2">
          </div>
        </div>
        {this.props.exercises.length == 0 ? '':this.props.exercises.map((val,i)=>{
          //this.capitalizeFirstChar(val.exercise_name)
          return(
            <div key={i}>
              <div  className="row">
                <div className="col-md-2">
                  <select className="form-control"
                    value={this.state.exercises[i].exercise_type}
                    onChange={(e)=>{
                      var exercises = this.state.exercises;
                      exercises[i].exercise_type = e.target.value;
                      this.setState({exercises:exercises});
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
                <div className="col-md-2">
                  <input type="text"
                    className="form-control"
                    value={this.state.exercises[i].exercise_name}
                    onChange={(e)=>{
                      var exercises = this.state.exercises;
                      exercises[i].exercise_name = e.target.value;
                      this.setState({exercises:exercises});
                    }}
                   />
                </div>
                <div className="col-md-2">
                  <input type="number"
                    className="form-control"
                    value={this.state.exercises[i].sets}
                    onChange={(e)=>{
                      var exercises = this.state.exercises;
                      exercises[i].sets = e.target.value;
                      this.setState({exercises:exercises});
                    }}
                   />
                </div>
                <div className="col-md-2">
                  {val.exercise_type == "cardio" ?
                    <input type="number"
                      className="form-control"
                      value={this.state.exercises[i].reps}
                      onChange={(e)=>{
                        var exercises = this.state.exercises;
                        exercises[i].reps = e.target.value;
                        this.setState({exercises:exercises});
                      }}
                     />
                    :
                    <select className="form-control"
                      value={this.state.exercises[i].reps}
                      onChange={(e)=>{
                        var exercises = this.state.exercises;
                        exercises[i].reps = e.target.value;
                        this.setState({exercises:exercises});
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
                  }

                </div>
                <div className="col-md-2">
                  <input type="number"
                    className="form-control"
                    value={this.state.exercises[i].weight}
                    onChange={(e)=>{
                      var exercises = this.state.exercises;
                      exercises[i].weight = e.target.value;
                      this.setState({exercises:exercises});
                    }}
                   />
                </div>
                {val.exercise_type == "cardio" ?
                  <div className="col-md-2">
                    <input type="number"
                      className="form-control"
                      value={this.state.exercises[i].cardio_incline}
                      onChange={(e)=>{
                        var exercises = this.state.exercises;
                        exercises[i].cardio_incline = e.target.value;
                        this.setState({exercises:exercises});
                      }}
                     />
                  </div>
                  :
                  ''
                }
                <div className="col-md-2">
                  {val.exercise_type == "cardio" ?
                    <select className="form-control"
                      value={this.state.exercises[i].weight_type}
                      onChange={(e)=>{
                        var exercises = this.state.exercises;
                        exercises[i].weight_type = e.target.value;
                        this.setState({exercises:exercises});
                      }}
                    >
                      <option  value="km">
                        Kilometers
                      </option>
                      <option  value="mph">
                        Mile
                      </option>
                    </select>
                    :
                    <select className="form-control"
                      value={this.state.exercises[i].weight_type}
                      onChange={(e)=>{
                        var exercises = this.state.exercises;
                        exercises[i].weight_type = e.target.value;
                        this.setState({exercises:exercises});
                      }}>
                      <option value="lb">
                        lb
                      </option>
                      <option value="kg">
                        kg
                      </option>
                    </select>
                  }

                </div>
                <br />
                <div className="col-md-2">
                  <button
                    onClick={(e)=>{
                      this.props.updateChosenExercise(i)
                    }} className="btn btn-primary">Update</button>
                </div>
                <div className="col-md-2">
                  <button
                    onClick={(e)=>{
                      this.props.removeExercise(i)
                    }} className="btn btn-primary">Remove</button>
                </div>
              </div>
              <br />
            </div>
          )
        })}
      </div>

    )
  }
}

class ShowWorkoutRoutines extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      allRoutines:[],
      allMuscleGroups:[],
    }
    this.getAllWorkoutRoutines = this.getAllWorkoutRoutines.bind(this);
    this.getMuscleGroups= this.getMuscleGroups.bind(this);
    this.setAsCurrent = this.setAsCurrent.bind(this);
    this.deleteRoutine = this.deleteRoutine.bind(this);
    this.getDefaultWorkoutRoutines = this.getDefaultWorkoutRoutines.bind(this);
    this.getRotuineNameWorkoutRoutine = this.getRotuineNameWorkoutRoutine.bind(this);
    this.getRoutineMuscleWorkoutRoutine = this.getRoutineMuscleWorkoutRoutine.bind(this);
    this.getAllWorkoutRoutines();
  }
  componentWillReceiveProps(nextProps){
    this.props = nextProps;
    this.getAllWorkoutRoutines();
  }
  deleteRoutine(id){
    let data = new FormData();
    data.append('id',id);
    axios.post(window.pageURL+'deleteRoutine',data).then((res)=>{
      this.getAllWorkoutRoutines();
    });
  }
  getMuscleGroups(id,i){
    let data = new FormData();
    data.append('id',id);
    axios.post(window.pageURL+'getMuscleGroups',data).then((res)=>{
      var data = [];
      for(var i = 0; i < this.state.allMuscleGroups.length; i++){
        data.push(this.state.allMuscleGroups[i]);
      }
      for(var i = 0; i < res.data.length; i++){
        data.push(res.data[i]);
      }
      this.setState({allMuscleGroups:data});
    });
  }
  getDefaultWorkoutRoutines(){
    axios.post(window.pageURL+'getAllRoutines').then((res)=>{
      this.state.allMuscleGroups = [];
      for(var i =0; i < res.data.length; i++){
        this.getMuscleGroups(res.data[i].id,i);
      }
      this.setState({allRoutines:res.data});
    });
  }
  getRoutineMuscleWorkoutRoutine(){
    let data = new FormData();
    data.append('searh_muscle_type',this.props.searh_muscle_type);
    axios.post(window.pageURL+'getRoutineMuscleWorkoutRoutine',data).then((res)=>{
      this.state.allMuscleGroups = [];
      for(var i =0; i < res.data.length; i++){
        this.getMuscleGroups(res.data[i].id,i);
      }
      this.setState({allRoutines:res.data});
    });
  }
  getRotuineNameWorkoutRoutine(){
    let data = new FormData();
    data.append('routine_name',this.props.routine_name);
    axios.post(window.pageURL+'getRotuineNameWorkoutRoutine',data).then((res)=>{
      this.state.allMuscleGroups = [];
      for(var i =0; i < res.data.length; i++){
        this.getMuscleGroups(res.data[i].id,i);
      }
      this.setState({allRoutines:res.data});
    });
  }
  getAllWorkoutRoutines(props){
    switch (this.props.filter) {
      case 'routine_name':
        if(this.props.routine_name.length >0){
          this.getRotuineNameWorkoutRoutine();
        }else{
          this.getDefaultWorkoutRoutines();
        }
        break;
      case 'muscle_group':
          this.getRoutineMuscleWorkoutRoutine();
          break;
      default:
        this.getDefaultWorkoutRoutines();
        break;
    }
  }
  setAsCurrent(id){
    let data = new FormData();
    data.append('id',id);
    axios.post(window.pageURL+'setAsCurrent',data).then((res)=>{
      this.getAllWorkoutRoutines();
    });
  }
  render(){
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <strong>Routine Name</strong>
          </div>
          <div className="col-md-3">
            <strong>Muscle Group</strong>
          </div>
          <div className="col-md-3">
            <strong>Set Current</strong>
          </div>
          <div className="col-md-3">
            <strong>Edit</strong>
          </div>
        </div>
        <br />
        {
          this.state.allRoutines.map((val,i)=>{
            return(
              <div key={i}>
                <div  className="row">
                  <div className="col-md-3">
                    {val.routine_name}
                  </div>
                  <div className="col-md-3">
                    {this.state.allMuscleGroups.map((val2,i2)=>{
                      if(val2.workout_routine_id == val.id){
                        return(
                          <span key={val2.exercise_name +" " + i +" "+ i2}>
                            {val2.exercise_type}
                            <br />
                          </span>
                        )
                      }

                    })}
                    {val.chosen == 'yes' ?
                    <span style={{color:'green'}}>
                        <i>Current</i>
                    </span>:''}
                  </div>
                  <div className="col-md-3">
                    {val.chosen == 'yes' ? '':
                      <button
                        onClick={(e)=>{this.setAsCurrent(val.id)}}
                        className="btn btn-primary">
                        Set as Current
                      </button>
                    }
                  </div>
                  <div className="col-md-3">
                    <button
                      onClick={(e)=>{this.props.updateWorkoutRoutine(val.id)}}
                      className="btn btn-primary">
                      Update
                    </button>
                    &nbsp; &nbsp;
                    <button
                      onClick={(e)=>{this.deleteRoutine(val.id)}}
                      className="btn btn-primary">
                      Delete
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            )
          })
        }
      </div>
    )
  }
}
