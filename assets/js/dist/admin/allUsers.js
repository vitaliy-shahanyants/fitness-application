import React from 'react';
import axios from 'axios';
import FormData from 'form-data';

const initialState = {
  users:[],
}

export default class AllUser extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.grabAllUsers = this.grabAllUsers.bind(this);
    this.adminRemoveUser = this.adminRemoveUser.bind(this);
  }
  grabAllUsers(){
    let data = new FormData();
    axios.post(window.pageURL+"grabAllUsers").then((res)=>{
      this.setState({users:res.data});
    })
  }
  adminRemoveUser(id){
    let data = new FormData();
    data.append('id',id)
    axios.post(window.pageURL+"adminRemoveUser",data).then((res)=>{
      this.grabAllUsers();
    })
  }
  render(){
    return(
      <div className="container">
        <h1>All Users</h1>
        <div className="row">
          <div className="col-3">
            <strong>(Username) First and Last Name</strong>
          </div>
          <div className="col-3">
            <strong>Userole</strong>
          </div>
          <div className="col-3">
            <storng>Account Status</storng>
          </div>
          <div className="col-3">
            <strong>Remove User (Permanently)</strong>
          </div>
        </div>
        {this.state.users.map((val,i)=>{
          return(
            <div className="row" key={i}>
              <div className="col-3">
                ({val.username}) {val.first_name} {val.last_name}
              </div>
              <div className="col-3">
                {val.role}
              </div>
              <div className="col-3">
                {val.enabled}
              </div>
              <div className="col-3">
                <button className="btn btn-primary"
                  onClick={()=>{
                    this.adminRemoveUser(val.id);
                  }}>
                  Remove
                </button>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
