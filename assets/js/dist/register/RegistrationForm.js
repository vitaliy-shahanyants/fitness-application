import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../login.css';
import SecurityQuestion from './SecurityQuestion.js';
import axios from 'axios';
import Querystring from 'querystring';
const initialState = {
  username:'',
  password:'',
  firstname:'',
  lastname:'',
  email:'',
  gender:'Male',
  age:'',
  security_question_one:'What was the last name of your third grade teacher?',
  security_answer_one:'',
  security_question_two:'What was the last name of your third grade teacher?',
  security_answer_two:'',
  error:[]
}
class RegistrationForm extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.submitRegistration = this.submitRegistration.bind(this);
  }
  submitRegistration(){
    const data =  Querystring.stringify(this.state);
    axios.post(window.pageURL+'createNewUser',data,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then((res)=>{
      this.setState({error:res.data});
      if(res.data == true){
        window.location.href = window.pageURL
      }
    });
  }
  render(){
    return(
      <div>
        {/*this is template from https://bootsnipp.com/snippets/featured/google-style-login-extended-with-html5-localstorage*/}
        <div className="card card-container">
          {this.state.error.length > 0 ? <ErrorAlert error={this.state.error} /> :''}
          <h1 className="white-color">Register</h1>
          <div className="form-signin">
            {/* Username */}
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
              <input type="text" className="form-control" placeholder="Username" value={this.state.username}
                onChange={(e)=>{this.setState({username:e.target.value})}} required />
              </div>
            </div>
            {/* Password */}
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
              <input type="password" id="inputEmail" className="form-control" placeholder="Password" value={this.state.password}
                onChange={(e)=>{this.setState({password:e.target.value})}} required  />
              </div>
            </div>
            {/* First Name */}
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
              <input type="text" id="inputPassword" className="form-control" placeholder="First Name" value={this.state.firstname}
                onChange={(e)=>{this.setState({firstname:e.target.value})}} required />
              </div>
            </div>
            {/* Last Name */}
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
              <input type="text" id="inputPassword" className="form-control" placeholder="Last Name" value={this.state.lastname}
                onChange={(e)=>{this.setState({lastname:e.target.value})}} required />
              </div>
            </div>
            {/* Email Name */}
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
              <input type="email" id="inputPassword" className="form-control" placeholder="Email Name" value={this.state.email}
                onChange={(e)=>{this.setState({email:e.target.value})}} required />
              </div>
            </div>
            {/* Gender */}
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-transgender"></i></span>
              <select className="form-control" onChange={(e)=>{this.setState({gender:e.target.value})}}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            {/* Age */}
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-child"></i></span>
              <input type="number" className="form-control" placeholder="Enter Your Age" value={this.state.age}
              onChange={(e)=>{this.setState({age:e.target.value})}} />
              </div>
            </div>
            {/* Security Question One */}
            <div className="form-group">
              <label className="text-white">Security question One</label>
              <div className="input-group">
                <SecurityQuestion changeValue={(e)=>{this.setState({security_question_one:e.target.value})}} />
              </div>
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-question"></i></span>
              <input type="text" className="form-control" placeholder="Enter Your Answer" value={this.state.security_answer_one}
              onChange={(e)=>{this.setState({security_answer_one:e.target.value})}} />
              </div>
            </div>
            {/* Security Question Two */}
            <div className="form-group">
              <label className="text-white">Security question Two</label>
              <div className="input-group">
                <SecurityQuestion  changeValue={(e)=>{this.setState({security_question_two:e.target.value})}} />
              </div>
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-question"></i></span>
              <input type="text" className="form-control" placeholder="Enter Your Answer" value={this.state.security_answer_two}
                onChange={(e)=>{this.setState({security_answer_two:e.target.value})}}/>
              </div>
            </div>
            <button className="btn btn-lg btn-primary btn-block btn-signin" onClick={this.submitRegistration} type="submit">Register</button>
          </div>
          <p className="white-color">
            <Link className="forgot-password" to="./login">Click Here</Link> to login
          </p>
        </div>
      </div>
    )
  }
}
class ErrorAlert extends React.Component{
  constructor(props){
    super(props);
    console.log(props.error);
  }
  render(){
    return(
      <div className="alert alert-danger">
        <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
      <strong>Error, please correct the following!</strong>
      <ul>
        {
          this.props.error.map((item,i)=>{
            return (<li key={"error"+i}>{Object.values(item)[0]}</li>)
          })
        }
      </ul>
      </div>
    );
  }
}
export default RegistrationForm;
