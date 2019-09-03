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
  feedback:''
}
export default class DeleteAccount extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.deleteMyAccount = this.deleteMyAccount.bind(this);
  }
  deleteMyAccount(){
    const data =  Querystring.stringify(this.state);
    axios.post(window.pageURL+"deleteMyAccount",
      data,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    .then((res)=>{
      window.location.href = window.pageURL;
    })
  }
  render(){
    return (
      <div className="card card-container">
        <div className="text-center form-signin">
          <div className="form-group text-white">
            <h1>Delete Account</h1>
            <p>Thank you for trying our application, we are always trying to create a better experiences fo our users.</p>
            <p>We would love for you to leave feedback!</p>
          <textarea className="form-control" rows="5" onChange={(e)=>{this.setState({feedback:e.target.value})}} value={this.state.feedback}></textarea>
            <button className="btn btn-lg btn-primary btn-block btn-signin" onClick={this.deleteMyAccount} type="submit">Submit</button>
          </div>
        </div>
      </div>
    );
  }
}
