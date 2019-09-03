import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './login.css';
import axios from 'axios';
import Querystring from 'querystring';
const initialState = {
  username:'',
  password:'',
  error:false,
  errorLog:[],
}
export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.submitToLogin = this.submitToLogin.bind(this);
  }
  submitToLogin(){
    const data =  Querystring.stringify(this.state);
    axios.post(window.pageURL+"logMeIn",data,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      .then((res)=>{
        if(res.data == true){
          window.location.href= window.pageURL;
        }else{
          this.setState({errorLog:"Invalid username or password",error:true});
          console.log(res.data);
        }
      })
  }
  render(){
    return (
      <div>
        {/*this is template from https://bootsnipp.com/snippets/featured/google-style-login-extended-with-html5-localstorage*/}
        <div className="card login-card card-container">
          <img id="profile-img" className="profile-img-card" src="../../assets/img/avatar_2x.png" />
          <p id="profile-name" className="profile-name-card"></p>
        {this.state.error?<ErrorDisplay />:''}
          <div className="form-signin">
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
              <input type="email" id="inputEmail" className="form-control" placeholder="Username" value={this.state.username}
                onChange={(e)=>{
                  this.setState({username:e.target.value});
                }} required autoFocus={true} />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
              <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={this.state.password}
                onChange={(e)=>{
                  this.setState({password:e.target.value})
                }} required />
              </div>
            </div>
            <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit" onClick={this.submitToLogin}>Sign in</button>
          </div>
          <Link to="./forgotpassword" className="forgot-password">
            Forgot the password?
          </Link>
          <p className="white-color">
            Don't have an account. <Link className="forgot-password" to="./register">Click Here</Link> to register
          </p>
        </div>
      </div>
    );
  }
}

class ErrorDisplay extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="alert alert-danger">
        <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
      <strong>Error!</strong> Invalid username or password
      </div>
    )
  }
}
