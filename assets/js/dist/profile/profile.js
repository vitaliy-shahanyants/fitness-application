import React from 'react';
import axios from 'axios';
import StartWorkout from '../workout/startWorkout.js';
import FormData from 'form-data'
const initialState = {
  image:'',
  first_name:'',
  last_name:'',
  date:'',
  about_me:'',
  joined_date:'',
  update_button:false,
  image_file:null,
  updateError:null,
  updateErrorContent:[]
}
export default class Profile extends React.Component {
  constructor(props){
    super(props);
    this.getUserProfileContent = this.getUserProfileContent.bind(this);
    this.getUserProfileContent();
    this.updateProfileButton = this.updateProfileButton.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.state = initialState;
  }
  updateProfile(){
    let data = new FormData();
    data.append('image',this.state.image_file);
    data.append('first_name',this.state.first_name);
    data.append('last_name',this.state.last_name);
    data.append('about_me',this.state.about_me);
    axios.post(window.pageURL+'updateProfile',data).then((res)=>{
      if(res.data != true){
        this.setState({
          updateError:true,
          updateErrorContent:res.data
        })
      }else{
        this.setState({
          updateError:false,
          updateErrorContent:[]
        })
      }
    });
  }
  updateProfileButton(){
    this.setState({update_button:true});
  }
  getUserProfileContent(){
    axios.get(window.pageURL+'getUserProfileContent').then((res)=>{
      this.setState(res.data);
    });
  }
  render(){
    return(
      <div>
        <h1 className="text-center">Profile</h1>
        <div className="row">
          {/*Profile Image*/}
          <div className="col-md-4">
            <img id="profile-img" className="profile-img-card" src={"../../assets/img/"+this.state.image} />
          <div className="text-center">
              <button className="btn btn-info"
                data-toggle="modal" data-target="#myModal"
                onClick={this.updateProfileButton}>Update Profile</button>
            </div>
          </div>
          <div className="col-md-8">
            <div>
              <strong>{this.state.first_name + " " + this.state.last_name}</strong>
            </div>
            <hr/>
            <p>
              Joined Date: {this.state.joined_date}
            </p>
            <div>
              <strong>About Me</strong>
            </div>
            <p>
              {this.state.about_me}
            </p>
            <p>
              <a href="./createRoutine"><button className="btn btn-primary">Create Workout</button></a>
            </p>
          </div>
        </div>
        <StartWorkout />
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Update Profile</h4>
              </div>
              <div className="modal-body">
                {
                  this.state.updateError != null ?
                  <div>
                    {(!this.state.updateError) ?
                      <div className="alert alert-success">
                        <strong>Update Success!</strong>
                      </div>
                      :
                      <div className="alert alert-danger">
                        <strong>Error, Please correct the following:</strong>
                        <ul>
                          {this.state.updateErrorContent.map((key,i)=>{
                            return(<li key={key+' '+i}>{key}</li>)
                          })}
                        </ul>
                      </div>
                    }
                  </div>:''
                }

                <div className="form">
                  <img id="profile-img" className="profile-img-card" src={"../../assets/img/"+this.state.image} />
                  <div className="form-group">
                    <label>Update Image</label>
                  <input type="file" id="image_file"
                    onChange={(e)=>{this.setState({image_file:e.target.files[0]})}}
                    className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>First Name</label>
                  <input type="text" className="form-control"
                    value={this.state.first_name}
                    onChange={(e)=>{this.setState({first_name:e.target.value})}} />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control"
                      value={this.state.last_name}
                      onChange={(e)=>{this.setState({last_name:e.target.value})}}/>
                  </div>
                  <div className="form-group">
                    <label>About Me</label>
                    <textarea className="form-control"
                      value={this.state.about_me}
                      onChange={(e)=>{this.setState({about_me:e.target.value})}}></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" onClick={this.updateProfile}>Update</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
