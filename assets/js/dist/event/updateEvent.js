import React from 'react';
import axios from 'axios';
import FormData from 'form-data';

const initialState = {
  event:{
    event_name:'Event Name',
    event_status:'public',
    event_description:'Description goes here',
    event_location:'Some Address',
    event_start_date:'2017-08-15',
    event_end_date:'2017-08-15',
  },
  event_id:0,
}
export default class UpdateEvent extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.state.event_id = props.event_id;
    this.getCurrentEventDetails = this.getCurrentEventDetails.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.getCurrentEventDetails();
  }
  getCurrentEventDetails(){
    let data = new FormData();
    data.append('event_id',this.state.event_id);
    axios.post(window.pageURL+"getCurrentEventDetails",data).then((res)=>{
      this.setState({event:res.data});
    })
  }
  updateEvent(){
    let data = new FormData();
    data.append('event_id',this.state.event_id);
    data.append('event_name',this.state.event.event_name);
    data.append('event_status',this.state.event.event_status);
    data.append('event_description',this.state.event.event_description);
    data.append('event_location',this.state.event.event_location);
    data.append('event_start_date',this.state.event.event_start_date);
    data.append('event_end_date',this.state.event.event_end_date);
    axios.post(window.pageURL+"updateEvent",data).then((res)=>{
      //this.setState({event:res.data});
    })
  }
  componentWillReceiveProps(nextProps){
    this.state.event_id = nextProps.event_id;
    this.getCurrentEventDetails();
  }
  render(){
    return(
      <div className="container">
          <h1>Update Event</h1>
          <div className="form-group row">
            <label className="col-2 col-form-label">
              Event Name
            </label>
            <div className="col-10">
              <input className="form-control"
                value={this.state.event.event_name}
                onChange={(e)=>{
                  var event = this.state.event;
                  event.event_name = e.target.value;
                  this.setState({event:event})
                }}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-2 col-form-label">
              Event Status
            </label>
            <div className="col-10">
                <select className="form-control"
                  value={this.state.event.event_status}
                  onChange={(e)=>{
                    var event = this.state.event;
                    event.event_status = e.target.value;
                    this.setState({event:event})
                  }}>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-2 col-form-label">
              Event Description
            </label>
            <div className="col-10">
              <textarea className="form-control"
                value={this.state.event.event_description}
                onChange={(e)=>{
                  var event = this.state.event;
                  event.event_description = e.target.value;
                  this.setState({event:event})
                }}>
              </textarea>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-2 col-form-label">
              Event Location
            </label>
            <div className="col-10">
              <input className="form-control"
                value={this.state.event.event_location}
                onChange={(e)=>{
                  var event = this.state.event;
                  event.event_location = e.target.value;
                  this.setState({event:event})
                }}/>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-2 col-form-label">
              Event Start Date
            </label>
            <div className="col-4">
              <input className="form-control"
                value={this.state.event.event_start_date}
                onChange={(e)=>{
                  var event = this.state.event;
                  event.event_start_date = e.target.value;
                  this.setState({event:event})
                }}/>
            </div>
            <label className="col-2 col-form-label">
              Event End Date
            </label>
            <div className="col-4">
              <input className="form-control"
                value={this.state.event.event_end_date}
                onChange={(e)=>{
                  var event = this.state.event;
                  event.event_end_date = e.target.value;
                  this.setState({event:event})
                }}/>
            </div>
          </div>
        <div className="row">
          <button className="btn btn-primary"
            onClick={this.updateEvent}>Update</button>
        </div>
      </div>
    );
  }
}
