import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './login.css';
import axios from 'axios';
import Querystring from 'querystring';
/*forgotpassword*/
const initialState = {
  username:'',
  correctUsername:false,
  newPasswordFlag:false,
  newPassword:'',
  newPasswordRepeat:'',
  security_answer:'',
  error:false,
}
export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.checkUsername = this.checkUsername.bind(this);
    this.checkSecurityQuestion = this.checkSecurityQuestion.bind(this);
    this.newPasswordEntry = this.newPasswordEntry.bind(this);
  }
  newPasswordEntry(){
    if(this.state.newPassword == this.state.newPasswordRepeat){
      const data =  Querystring.stringify({username:this.state.username,
        newPassword:this.state.newPassword,
        newPasswordRepeat:this.state.newPasswordRepeat,
        security_answer:this.state.security_answer});
      axios.post(window.pageURL+"newPasswordEntry",data,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then((res)=>{
        if(res.data){
          this.setState({error:false});
          window.location.href = window.pageURL+"login";
        }else{
          this.setState({
            error:true
          });
        }
      });
    }else{
      this.setState({
        error:true,
      })
    }
  }
  checkSecurityQuestion(){
    const data =  Querystring.stringify({username:this.state.username,security_answer:this.state.security_answer});
    axios.post(window.pageURL+"checkSecurityQuestion",data,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    .then((res)=>{
      if(res.data == true){
        this.setState({
          correctUsername:false,
          newPasswordFlag:true,
          error:false,
        });
      }else{
        this.setState({
          error:true,
        })
      }
    });
  }
  checkUsername(){
    const data =  Querystring.stringify(this.state);
    axios.post(window.pageURL+"checkUsername",data,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      .then((res)=>{
        if(res.data == true){
          this.setState({
            correctUsername:true,
            newPasswordFlag:false,
            error:false,
          })
        }else{
          this.setState({
            error:true,
          })
        }
      });
  }
  render(){
    return(
      <div className="card card-container">
        <h1 className="white-color">Forgot Password</h1>
        <div className="form-signin">
          {this.state.correctUsername ?
          <div>
            {/* Security Question One */}
            {this.state.error ?  <ErrorDisplay errorName="Wrong Answer" errorMessage="Sorry, but you entered wrong answer" />:""}

            <div className="form-group">
              <label className="text-white"><strong>Security question</strong></label>
              <div className="input-group">
                <SecurityQuestion username = {this.state.username} changeValue={(e)=>{this.setState({security_question_one:e.target.value})}} />
              </div>
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-question"></i></span>
              <input type="text" className="form-control" placeholder="Enter Your Answer" value={this.state.security_answer}
              onChange={(e)=>{this.setState({security_answer:e.target.value})}} />
              </div>
            </div>
            <button className="btn btn-lg btn-primary btn-block btn-signin" onClick={this.checkSecurityQuestion}  type="submit">Submit</button>
        </div>
        :
        <div>
          {this.state.newPasswordFlag ?
            <div>
              <strong className="text-white">New Password</strong>
            {this.state.error ? <ErrorDisplay errorName="Bad Paswword" errorMessage="Sorry there is something wrong with your password." />:""}
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                <input type="text" className="form-control" placeholder="Password" value={this.state.newPassword}
                  onChange={(e)=>{this.setState({newPassword:e.target.value})}} required />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                <input type="text" className="form-control" placeholder="Password Repeat" value={this.state.newPasswordRepeat}
                  onChange={(e)=>{this.setState({newPasswordRepeat:e.target.value})}} required />
                </div>
              </div>
              <button className="btn btn-lg btn-primary btn-block btn-signin" onClick={this.newPasswordEntry} type="submit">Submit</button>
            </div>
            :
            <div>
              {this.state.error ? <ErrorDisplay errorName="Wrong Username" errorMessage="Sorry, but there is no such usenamr" />:""}
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
                <input type="text" className="form-control" placeholder="Username" value={this.state.username}
                  onChange={(e)=>{this.setState({username:e.target.value})}} required />
                </div>
              </div>
              <button className="btn btn-lg btn-primary btn-block btn-signin" onClick={this.checkUsername} type="submit">Submit</button>
            </div>
          }
      </div>
        }
      </div>
    </div>
    );
  }
}

class SecurityQuestion extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      security_question:''
    }
    const data =  Querystring.stringify({username:this.props.username});
    axios.post(window.pageURL+"getQuestion",data,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      .then((res)=>{
        this.setState({security_question:res.data})
      });
  }
  render(){
    return(<div className="text-white">
      Question: {this.state.security_question}
    </div>);
  }
}

class GetSecurityQustion extends React.Component {
  constructor(props) {
    super(props);
    this.getQuestion = this.getQuestion.bind(this);
    this.getQuestion();
    this.state = {
      question:'',
    }
  }
  componentWillReceiveProps(nextProps){
    this.getQuestion();
  }
  getQuestion(){
    console.log(this.props.username);
  }
  render(){
    return (
      <div>Here is the questions</div>
    )
  }
}
const ErrorDisplay = (props)=>(
  <div className="alert alert-danger">
    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
  <strong>{props.errorName}!</strong> {props.errorMessage}
  </div>
)
