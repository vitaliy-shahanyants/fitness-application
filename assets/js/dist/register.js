import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './login.css';
import RegistrationForm from './register/RegistrationForm.js'
export default class Register extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <RegistrationForm />
    )
  }
}
