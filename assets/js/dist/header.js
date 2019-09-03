import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import axios from 'axios';
const initialState = {
  logedin:false,
}
class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.checkIfLogedIn = this.checkIfLogedIn.bind(this);
    this.checkIfLogedIn();
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
  componentWillReceiveProps(nextProps){
    this.checkIfLogedIn();
  }
  render(){
    return(
      <nav  className="navbar navbar-toggleable-md navbar-light bg-faded navbar-fixed-top">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="./">True Athlete</a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="nav navbar-nav navbar-right">
            <li className={"nav-item " +(window.location.href.includes('home')?'active': '')}>
              <a className="nav-link" href="./">Home</a>
            </li>
            <li className={"nav-item " +(window.location.href.includes('about')?'active': '')}>
              <a className="nav-link" href="./about">About</a>
            </li>
            { this.state.logedin ? <Workout /> : ''}
            { this.state.logedin ? <ProfileContent /> : ''}
            { this.state.logedin ?
              <li className={"nav-item " +(window.location.href.includes('bodyMeasurements')?'active': '')}>
                <a className="nav-link" href="./bodyMeasurements">Body Measurements</a>
              </li>
              : ''}
              { this.state.logedin ? <Event /> : ''}
            { this.state.logedin ?
              <li className={"nav-item " +(window.location.href.includes('tracking')?'active': '')}>
                <a className="nav-link" href="./tracking">Tracking Progress</a>
              </li>
              : ''}
            { this.state.logedin ? <AccountDtailsHeader /> : ''}

            {
              this.state.logedin? ''
              :
              <li className={"dropdown nav-item " + (window.location.href.includes('login') ? 'active': '')}>
                <a className="dropdown-toggle nav-link" data-toggle="dropdown" href="#">Login</a>
                <ul className="dropdown-menu">
                  <li><Link className="nav-link" to="./login">Login</Link></li>
                <li><Link className="nav-link" to="./register">Register</Link></li>
                </ul>
              </li>
            }

            {
              (this.state.logedin && this.state.admin)?
              <Admin />:''
            }

          </ul>
        </div>
      </nav>
    );
  }
}

const Admin = () => (
  <li className={"dropdown nav-item " + (window.location.href.includes('admin') ? 'active': '')}>
    <a className="dropdown-toggle nav-link" data-toggle="dropdown" href="#">Admin</a>
    <ul className="dropdown-menu">
      <li><a className="nav-link" href="./allUsers">All Users</a></li>
      <li><a className="nav-link" href="./userTracking">User Tracking</a></li>
      <li><a className="nav-link" href="./allUsers">Settings</a></li>
    </ul>
  </li>
)

const Event = () => (
  <li className={"dropdown nav-item " + (window.location.href.includes('event') ? 'active': '')}>
    <a className="dropdown-toggle nav-link" data-toggle="dropdown" href="#">Event</a>
    <ul className="dropdown-menu">
      <li><a className="nav-link" href="./events">Current Events</a></li>
      <li><a className="nav-link" href="./searchEvent">Search For Events</a></li>
      <li><a className="nav-link" href="./createEvent">Create Event</a></li>
      <li><a className="nav-link" href="./allEvents">All My Events</a></li>
    </ul>
  </li>
)

const Workout = () => (
  <li className={"dropdown nav-item " + (window.location.href.includes('workout') ? 'active': '')}>
    <a className="dropdown-toggle nav-link" data-toggle="dropdown" href="#">Workout</a>
    <ul className="dropdown-menu">
      <li><a className="nav-link" href="./startWorkout">Start Workout Routine</a></li>
      <li><a className="nav-link" href="./createRoutine">Create Workout Routine</a></li>
      <li><a className="nav-link" href="./createExercise">Create Exercise</a></li>
      <li><a className="nav-link" href="./search">Search</a></li>
      <li><a className="nav-link" href="./allRoutines">All Workout Routines</a></li>
    </ul>
  </li>
)
const AccountDtailsHeader = () => (
    <li className={"dropdown nav-item " + (window.location.href.includes('login') ? 'active': '')}>
      <a className="dropdown-toggle nav-link" data-toggle="dropdown" href="#">Acount Details</a>
      <ul className="dropdown-menu">
        <li><a className="nav-link" href="./updateAccount">Update Account</a></li>
        <li><a className="nav-link" href="./deleteAccount">Delete Account</a></li>
        <li><a className="nav-link" href="./logout">Logout</a></li>
      </ul>
    </li>
)
const ProfileContent = () => (
    <li className={"dropdown nav-item " + (window.location.href.includes('profile') ? 'active': '')}>
      <a className="dropdown-toggle nav-link" data-toggle="dropdown" href="#">Profile</a>
      <ul className="dropdown-menu">
        <li><Link className="nav-link" to="./profile">Profile</Link></li>
        <li><Link className="nav-link" to="./posts">Posts</Link></li>
        <li><Link className="nav-link" to="./inbox">Inbox</Link></li>
      </ul>
    </li>
)
export default Header;
