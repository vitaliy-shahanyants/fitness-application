import React from 'react';
import './stylesheet.css'
export default class Footer extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <footer className="container-fluid text-center">
        <p>True Athlete</p>
      </footer>)
  }
}
