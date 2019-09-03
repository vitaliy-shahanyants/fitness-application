//Imports Modules
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import Header from './header.js'
import About from './about.js'
import Home from './home.js'
/*Authentication*/
import Login from './login.js'
import Register from './register.js'
import Footer from './footer.js'
import ForgotPassword from './forgotpassword.js';
/*Account Details*/
import DeleteAccount from './acount/deleteAccount.js';
import UpdateAccount from './acount/updateAccount.js';
/*Profile Page*/
import Profile from './profile/profile.js';
import Posts from './profile/posts.js';
import Inbox from './profile/inbox.js';
/*Workout Routine*/
import CreateWorkoutRoutine from './workout/createWorkoutRoutine.js'
import CreateExercise from './workout/createExercise.js'
import AllWorkoutRoutines from './workout/allWorkoutRoutines.js'
import StartWorkout from './workout/startWorkout.js'
import Search from './workout/search.js'

/* Body Measurements */
import BodyMeasurements from './bodyMeasurements/bodyMeasurements.js';

/* Tracking Progress */
import Tracking from './tracking/tracking.js';
/* Event Module */
import Events from './event/event.js';
import CreateEvent from './event/createEvent.js';
import AllEvents from './event/allEvents.js';
import SearchEvent from './event/searchEvent.js';

/* Admin */
import AllUser from './admin/allUsers.js';
import UserTrack from './admin/UserTracking.js';


import axios from 'axios';
class Body extends React.Component {
  constructor(props){
    super(props);
    this.checkIfLogedIn = this.checkIfLogedIn.bind(this);
    this.redirectToHome = this.redirectToHome.bind(this);
    this.trackThisUser = this.trackThisUser.bind(this);
    this.state = {
      logedin:false,
      admin:false,
    }
    this.trackThisUser();
    this.checkIfLogedIn();
  }
  trackThisUser(){
    let data = new FormData();
    data.append('lon',google.loader.ClientLocation.longitude);
    data.append('lat',google.loader.ClientLocation.latitude);
    data.append('city',google.loader.ClientLocation.address.city);
    data.append('region',google.loader.ClientLocation.address.region);
    data.append('country',google.loader.ClientLocation.address.country);
    axios.post(window.pageURL+"trackThisUser",data);
  }
  checkIfLogedIn(){
    axios.get(window.pageURL+"checkIfLogedIn").then((res)=>{
      if(res.data == 'admin'){
        this.setState({
          logedin:true,
          admin:true,
        })
      }else{
        this.setState({
          logedin:res.data,
          admin:false,
        })
      }

    });
  }
  redirectToHome(){
    window.location.href = window.pageURL;
  }
  render(){
    return (
      <div className="container-fluid">
        <Header />
        <Route exact path="/fitness-application/" component={Home}/>
        <Route exact path={window.pageURL+""} component={Home}/>
        <Route exact path={window.pageURL+"home"} component={Home}/>
        <Route path={window.pageURL+"about"} component={About}/>
        <Route path={window.pageURL+"login"} component={Login}/>
        <Route path={window.pageURL+"register"} component={Register}/>
        <Route path={window.pageURL+"logout"} component={Logout}/>
        <Route path={window.pageURL+"forgotpassword"} component={ForgotPassword}/>
      {this.state.logedin?
        <div>
          {/* Account Details */}
          <Route path={window.pageURL+"deleteAccount"} component={DeleteAccount}/>
          <Route path={window.pageURL+"updateAccount"} component={UpdateAccount}/>
        {/* Profile */}
        <Route path={window.pageURL+"profile"} component={Profile}/>
        <Route path={window.pageURL+"posts"} component={Posts}/>
        <Route path={window.pageURL+"inbox"} component={Inbox}/>
        {/* Workout */}
        <Route path={window.pageURL+"createRoutine"} component={CreateWorkoutRoutine}/>
        <Route path={window.pageURL+"createExercise"} component={CreateExercise}/>
        <Route path={window.pageURL+"allRoutines"} component={AllWorkoutRoutines}/>
        <Route path={window.pageURL+"startWorkout"} component={StartWorkout}/>
        <Route path={window.pageURL+"search"} component={Search}/>
        {/* Body Measurements */}
        <Route path={window.pageURL+"bodyMeasurements"} component={BodyMeasurements}/>
        {/*Tracking Progress*/}
        <Route path={window.pageURL+"tracking"} component={Tracking}/>
        {/*Events*/}
        <Route path={window.pageURL+"events"} component={Events}/>
        <Route path={window.pageURL+"createEvent"} component={CreateEvent}/>
        <Route path={window.pageURL+"allEvents"} component={AllEvents}/>
        <Route path={window.pageURL+"searchEvent"} component={SearchEvent}/>
        {this.state.admin ?
          <div>
            {/* Admin */}
            <Route path={window.pageURL+"allUsers"} component={AllUser}/>
            <Route path={window.pageURL+"userTracking"} component={UserTrack}/>
          </div> : ''
        }
      </div>:''}

        <Footer />
      </div>
    );
  }
}
class Logout extends React.Component{
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
    this.logout();
  }
  logout(){
    axios.get(window.pageURL+'logMeOut').then((res)=>{
      window.location.href = window.pageURL;
    });
  }
  componentWillReceiveProps(nextProps){
    this.logout()
  }
  render(){
    return null;
  }
}
ReactDOM.render(<Router><Body /></Router>,document.getElementById('app'));
