import React from 'react';
import axios from 'axios';
import FormData from 'form-data'
const initialState = {
  searchFor:'Chest',
  searchBy:'routine_name',
  searchedClicked:false,
  workoutRoutine:[],
  rating:true,
  rotuine_id:0,
  user_id:0,
}
import Rating from 'react-rating';
export default class Search extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.rateRoutine = this.rateRoutine.bind(this);
  }
  rateRoutine(rate,routineId){
    let data = new FormData();
    data.append('routine_rate',rate);
    data.append('routine_id',routineId);
    axios.post(window.pageURL+"rateRoutine",data).then((res)=>{
      //console.log(res.data);
      this.setState({rating:true});
    });
  }
  render(){
    return(
      <div className="container">
        <h1>Search For Workout Routine</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group row">
              <label className="col-3 col-form-label">Search For</label>

              <div className="col-9">
                {this.state.searchBy == "muscle_group" ?
                <select className="form-control"
                  value={this.state.searchFor}
                  onChange={(e)=>{
                    this.setState({searchFor:e.target.value});
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
                :
                  <input className="form-control" type="text"
                  value={this.state.searchFor}
                  onChange={(e)=>{
                    this.setState({searchFor:e.target.value});
                  }}/>
                }
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <select className="form-control"
                value={this.state.searchBy}
                onChange={(e)=>{
                  this.setState({searchBy:e.target.value});
                }}>
                <option value="routine_name">Routine Name</option>
                <option value="username">Username</option>
                <option value="muscle_group">Exercise Type</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="row pull-right">
            <button className="btn btn-primary "
              onClick={(e)=>{
                this.setState({searchedClicked:true})
              }}>Search</button>
          </div>
        </div>

        {this.state.searchedClicked ? <SearchList initialState={this.state} rateRoutine={this.rateRoutine} /> : ''}
      </div>
    )
  }
}
class SearchList extends React.Component{
  constructor(props){
    super(props);
    this.state = props.initialState;
    this.state['profile_clicked'] = false;
    this.state['routine_click'] = false;
    this.state['regular_search'] = false;
    //this.state['user_id'] = 0;
    //this.state['rotuine_id'] = 0;
    this.searchBy = this.searchBy.bind(this);
    this.changeViews = this.changeViews.bind(this);
    this.addToMeWorkoutRoutine = this.addToMeWorkoutRoutine.bind(this);
    this.searchBy(this.state.searchBy,this.state.searchFor);

  }
  componentWillReceiveProps(nextProps){
    this.state = nextProps.initialState;
    this.searchBy(this.state.searchBy,this.state.searchFor);
  }
  searchBy(type,search){
    let url = "";
    switch (type) {
      case "routine_name":
        url = "searchByRoutineName";
        break;
      case "username":
        url = "searchByUsername";
        break;
      case "muscle_group":
        url = "searchByMuscleGroup";
        break;
    }
    let data = new FormData();
    data.append('searchFor',search);
    axios.post(window.pageURL+url,data).then((res)=>{
      //console.log(res.data);
      this.setState({
        workoutRoutine:res.data,
        regular_search:true,
        profile_clicked:false,
        routine_click:false,
      });
    });
  }
  changeViews(view,id,user_id=0){
    switch (view) {
      case "regular_search":
        this.setState({
          regular_search:true,
          profile_clicked:false,
          routine_click:false,
        });
        break;
      case "profile_clicked":
        this.setState({
          user_id:id,
          regular_search:false,
          profile_clicked:true,
          routine_click:false,
        });
        break;
      case "routine_click":
        this.setState({
          rotuine_id:id,
          user_id:user_id,
          regular_search:false,
          profile_clicked:false,
          routine_click:true,
        });
        break;
    }
  }
  addToMeWorkoutRoutine(routineID){
    let data = new FormData();
    data.append('routineID',routineID);
    axios.post(window.pageURL+"addToMeWorkoutRoutine",data).then((res)=>{
    });
  }
  render(){
    return(
      <div className="container-fluid">
        {this.state.regular_search ?
          <div>
            <div className="row">
              Search Result For <strong>{this.state.searchFor}</strong>.
            </div>
            <div className="row">
              <div className="col-md-3">
                <strong>Name</strong>
              </div>
              <div className="col-md-3">
                <strong>Routine Name</strong>
              </div>
              <div className="col-md-3">
                <strong>Rating</strong>
              </div>
              <div className="col-md-3">

              </div>
            </div>
          </div>
          :''
        }
        {this.state.regular_search ?
          <div>
            {this.state.workoutRoutine.map((val,i) => {
              return(
              <div key={i} className="row">
                <div className="col-md-3">
                  <span role="button"
                    style={{'color':'blue'}}
                    onClick={(e)=>{this.changeViews('profile_clicked',val.user_id)}}>
                    {val.first_name} {val.last_name}
                  </span>
                </div>
                <div className="col-md-3">
                  <span role="button"
                    style={{'color':'blue'}}
                    onClick={(e)=>{this.changeViews('routine_click',val.id,val.user_id)}}>
                    {val.routine_name}
                  </span>
                </div>
                <div className="col-md-3">
                  <Rating
                    stop={5}
                    initialRate={parseFloat(val.rating)}
                    empty={['fa fa-star-o fa-2x low', 'fa fa-star-o fa-2x low',
                      'fa fa-star-o fa-2x medium', 'fa fa-star-o fa-2x medium',
                      'fa fa-star-o fa-2x high', 'fa fa-star-o fa-2x high']}
                    full={['fa fa-star fa-2x low', 'fa fa-star fa-2x low',
                      'fa fa-star fa-2x medium', 'fa fa-star fa-2x medium',
                      'fa fa-star fa-2x high', 'fa fa-star fa-2x high']}
                    onChange={(rate)=>{
                      this.props.rateRoutine(rate,val.id);
                    }}
                  />
                </div>
                <div className="col-md-3">
                  <button onClick={(e)=>{
                    this.addToMeWorkoutRoutine(val.id);
                  }} className="btn btn-primary">Add</button>
                </div>
              </div>)
            })}
          </div>
          :''}
          {this.state.profile_clicked ? <ProfileMoreDetail userID={this.state.user_id} />:''}
          {this.state.routine_click ?
            <div className="row"><RoutineMoreDetails userID={this.state.user_id} routineID={this.state.rotuine_id} />
          </div>:''}
      </div>
    )
  }
}

class RoutineMoreDetails extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      exercises:[]
    }

    this.getRoutineExercises = this.getRoutineExercises.bind(this);

    this.getRoutineExercises(props.userID,props.routineID);
  }
  getRoutineExercises(userID,routineID){
    let data = new FormData();
    data.append('userID',userID);
    data.append('routineID',routineID);
    axios.post(window.pageURL+'getRoutineExercises',data).then((res)=>{
      //console.log(res.data);
      this.setState({exercises:res.data});
    });
  }
  componentWillReceiveProps(nextProps){
    this.getProfile(nextProps.userID,nextProps.routineID);
  }
  render(){
    return(
      <div className="container-fluid">
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
        </div>
        <div>
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
                  {val.weight}
                </div>
                <div className="col-md-2">
                  {val.exercise_type == "cardio" ?
                  <span>{val.cardio_incline}</span>:
                  <span>{val.weight_type}</span>}
                </div>
              </div>
            );
          })}
        </div>
        <Comments routineID={this.props.routineID} userID={this.props.userID} />
      </div>
    )
  }
}
class Comments extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      posts:[],
      postText:'',
    }
    this.getRoutinePosts = this.getRoutinePosts.bind(this);
    this.createRotuinePost = this.createRotuinePost.bind(this);
  }
  getRoutinePosts(routineID){
    let data = new FormData();
    data.append('routineID',routineID);
    axios.post(window.pageURL+'getRoutinePosts',data).then((res)=>{
      this.setState({posts:res.data});
    });
  }
  createRotuinePost(routineID){
    let data = new FormData();
    data.append('routineID',routineID);
    data.append('postText',this.state.postText);
    axios.post(window.pageURL+'createRotuinePost',data).then((res)=>{
      //console.log(res.data);
      //this.setState({exercises:res.data});
      this.getRoutinePosts(this.props.routineID);
    });
  }
  componentWillReceiveProps(nextProps){
    this.getRoutinePosts(nextProps.routineID);
  }
  render(){
    return(
      <div>
        <div className="row">
          <h2>Comments</h2>
        </div>
        <div className="form-group row">
          <label className="col-2 col-form-label"><strong>New Comment</strong></label>
          <div className="col-8">
            <textarea className="form-control"
              onChange={(e)=>{
                this.setState({postText:e.target.value});
              }}></textarea>
          </div>
          <div className="col-2">
            <button className="btn btn-primary"
              onClick={(e)=>{
                this.createRotuinePost(this.props.routineID);
              }}>Comment</button>
          </div>
        </div>
        <div className="row">
          <ListOfComments posts={this.state.posts} />
        </div>
      </div>

    )
  }
}
class ListOfComments extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      posts:props.posts
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({posts:nextProps.posts});
  }
  render(){
    return(
      <div className="container-fluid">
        {this.state.posts.map((val,i)=>{
          return(
            <div key={i} className="row">
              <div className="col-3">
                <div>
                  <img id="profile-img" className="profile-img-card" src={"../../assets/img/"+val.image} />
                </div>
                <div>
                  <strong>{val.first_name} {val.last_name}</strong>
                </div>
              </div>
              <div className="col-5">
                {val.post}
              </div>
              <div className="col-4">
                <Rating
                  stop={5}
                  initialRate={parseFloat(val.rating)}
                  empty={['fa fa-star-o fa-2x low', 'fa fa-star-o fa-2x low',
                    'fa fa-star-o fa-2x medium', 'fa fa-star-o fa-2x medium']}
                  full={['fa fa-star fa-2x low', 'fa fa-star fa-2x low',
                    'fa fa-star fa-2x medium', 'fa fa-star fa-2x medium']}
                    readonly
                />
              </div>
            </div>
          );
        })}
      </div>
    )
  }
}
class ProfileMoreDetail extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      image:'',
      first_name:'',
      last_name:'',
      date:'',
      about_me:'',
      joined_date:'',
      user_id:props.userID,
    }

    this.getProfile = this.getProfile.bind(this);
    this.getProfile(props.userID);
  }
  componentWillReceiveProps(nextProps){
    this.getProfile(nextProps.userID);
  }
  getProfile(id){
    let data = new FormData();
    data.append('id',id);
    axios.post(window.pageURL+'getProfile',data).then((res)=>{
      this.setState({
        image:res.data[0].image,
        first_name:res.data[0].first_name,
        last_name:res.data[0].last_name,
        about_me:res.data[0].about_me,
        joined_date:res.data[0].joined_date,
      });
    });
  }
  render(){
    return(
      <div className="container-fluid">
        <div className="row">
          {/*Profile Image*/}
          <div className="col-md-4">
            <img id="profile-img" className="profile-img-card" src={"../../assets/img/"+this.state.image} />
          </div>
          <div className="col-md-8">
            <div>
              <strong>{this.state.first_name + " " + this.state.last_name}</strong>
            </div>
            <hr/>
            <p>
              Joined Date: {this.state.joined_date}
            </p>
            <div>
              <strong>About Me</strong>
            </div>
            <p>
              {this.state.about_me}
            </p>
          </div>
        </div>
      </div>
    )
  }
}
