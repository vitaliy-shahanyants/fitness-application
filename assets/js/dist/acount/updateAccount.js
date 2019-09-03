import React from 'react';
import axios from 'axios';
import Querystring from 'querystring';
const initialState = {
  username:'',
  password:'',
  first_name:'',
  last_name:'',
  email:'',
  gender:'',
  age:'',
  security_question_one:'',
  security_answer_one:'',
  security_question_two:'',
  security_answer_two:'',
  errorOccored:false,
  error:[],
  success:false,
}
export default class UpdateAccount extends React.Component{
  constructor(props){
    super(props);
    this.getAccountDetails = this.getAccountDetails.bind(this);
    this.updateAccountDetails = this.updateAccountDetails.bind(this);
    this.state = initialState;
    this.getAccountDetails();
  }
  updateAccountDetails(){
    const data =  Querystring.stringify(this.state);
    axios.post(window.pageURL+'updateAccountDetails',data,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then((res)=>{
      this.setState({error:res.data});
      if(res.data == true){
        this.setState({
          success:true,
        });
      }else{
        this.setState({
          errorOccored:true,
          error:res.data.error,
        });
      }
    });
  }
  getAccountDetails(){
    axios.get(window.pageURL+"getAccountDetails").then((res)=>{
      this.setState(res.data);
    })
  }
  render(){
    return(
      <div className="form">
        <br />
      {this.state.errorOccored ? <ErrorAlert error={this.state.error} />:<div>
        {this.state.success? <SuccessAlert />:''}
      </div>}
        <div className="form-group row col-md-6 offset-md-3">
          <label className="col-2 col-form-label">Username</label>
        <div className="col-10">
            <input className="form-control" type="text" value={this.state.username}
              onChange={(e)=>{this.setState({username:e.target.value})}} />
          </div>
        </div>
        <div className="form-group row col-md-6 offset-md-3">
          <label className="col-2 col-form-label">Password</label>
        <div className="col-10">
            <input className="form-control" type="password" value={this.state.password}
              onChange={(e)=>{this.setState({password:e.target.value})}} />
          </div>
        </div>
        <div className="form-group row col-md-6 offset-md-3">
          <label className="col-2 col-form-label">Firstname</label>
        <div className="col-10">
            <input className="form-control" type="text" value={this.state.first_name}
              onChange={(e)=>{this.setState({first_name:e.target.value})}} />
          </div>
        </div>
        <div className="form-group row col-md-6 offset-md-3">
          <label className="col-2 col-form-label">Lastname</label>
        <div className="col-10">
            <input className="form-control" type="text" value={this.state.last_name}
              onChange={(e)=>{this.setState({last_name:e.target.value})}} />
          </div>
        </div>
        <div className="form-group row col-md-6 offset-md-3">
          <label className="col-2 col-form-label">Email</label>
        <div className="col-10">
            <input className="form-control" type="text" value={this.state.email}
              onChange={(e)=>{this.setState({email:e.target.value})}} />
          </div>
        </div>
        <div className="form-group row col-md-6 offset-md-3">
          <label className="col-2 col-form-label">Gender</label>
        <div className="col-10">
            <select className="form-control" value={this.state.gender}
              onChange={(e)=>{this.setState({gender:e.target.value})}}>
              <option value="Male">Male</option>
            <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className="form-group row col-md-6 offset-md-3">
          <label className="col-2 col-form-label">Age</label>
        <div className="col-10">
            <input className="form-control" type="number" value={this.state.age}
              onChange={(e)=>{this.setState({age:e.target.value})}} />
          </div>
        </div>
        <div className="form-group row col-md-6 offset-md-3">
          <label className="col-2 col-form-label">Question One</label>
        <div className="col-10">
          <DisplaySecurityQuestions questionValue={this.state.security_question_one}
          changeValue={(e)=>{this.setState({security_question_one:e.target.value})}} />
          </div>
        </div>
        <div className="form-group row col-md-6 offset-md-3">
          <label className="col-2 col-form-label">Answer One</label>
        <div className="col-10">
            <input className="form-control" type="text" value={this.state.security_answer_one}
              onChange={(e)=>{this.setState({security_answer_one:e.target.value})}} />
          </div>
        </div>
        <div className="form-group row col-md-6 offset-md-3">
          <label className="col-2 col-form-label">Question Two</label>
        <div className="col-10">
            <DisplaySecurityQuestions questionValue={this.state.security_question_two}
            changeValue={(e)=>{this.setState({security_question_two:e.target.value})}} />
          </div>
        </div>
        <div className="form-group row col-md-6 offset-md-3">
          <label className="col-2 col-form-label">Answer Two</label>
        <div className="col-10">
            <input className="form-control" type="text" value={this.state.security_answer_two}
              onChange={(e)=>{this.setState({security_answer_two:e.target.value})}} />
          </div>
        </div>
        <div className="form-group row col-md-6 offset-md-3">
          <button className="btn btn-lg btn-primary btn-block btn-signin" onClick={this.updateAccountDetails} type="submit">Update</button>
        </div>
      </div>
    );
  }
}

class DisplaySecurityQuestions extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      collectionQuestions:[]
    }
    this.getSecurityQuestions();
  }
  getSecurityQuestions(){
    let collectionQuestions = []
    axios.get(window.pageURL+'getSecurityQuestion').then((res)=>{
      res.data.map((item,i)=>{
        Object.keys(item).map((kitem)=>{
           collectionQuestions.push(<option key={kitem+" "+i} value={res.data[i][kitem]}>{res.data[i][kitem]}</option>)
        });
      });
      this.setState({
        collectionQuestions:collectionQuestions
      });
    });
  }
  render(){
    return(
      <select className="form-control" value={this.props.questionValue} onChange={this.props.changeValue}>
        {this.state.collectionQuestions.map((item,i)=>{
          return this.state.collectionQuestions[i];
        })}
      </select>
    );
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
const SuccessAlert = () =>(
  <div className="alert alert-success">
    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
    <strong>Success!</strong> Account have been updated
  </div>
)
