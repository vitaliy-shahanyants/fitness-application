import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../login.css';
import axios from 'axios';
class SecurityQuestion extends React.Component{
  constructor(props){
    super(props);
    this.getSecurityQuestions = this.getSecurityQuestions.bind(this);
    this.state = {
      collectionQuestions:[]
    }
    this.getSecurityQuestions();
  }
  componentWillReceiveProps(nextProps){
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
      <select className="form-control" onChange={this.props.changeValue}>
        {this.state.collectionQuestions.map((item,i)=>{
          return this.state.collectionQuestions[i];
        })}
      </select>
    );
  }
}
export default SecurityQuestion;
