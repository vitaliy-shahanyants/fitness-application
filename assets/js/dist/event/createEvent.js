import React from 'react';
import axios from 'axios';
import FormData from 'form-data';

const initialState = {
  event:{
    event_name:'',
    event_status:'public',
    event_description:'',
    event_location:'',
    event_start_date:'',
    event_end_date:'',
  }
}
export default class CreateEvent extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.createEvent = this.createEvent.bind(this);
  }
  createEvent(){
    let data = new FormData();
    data.append('event_name',this.state.event.event_name);
    data.append('event_status',this.state.event.event_status);
    data.append('event_description',this.state.event.event_description);
    data.append('event_location',this.state.event.event_location);
    data.append('event_start_date',this.state.event.event_start_date);
    data.append('event_end_date',this.state.event.event_end_date);
    axios.post(window.pageURL+"createMyEvent",data).then((res)=>{
      //this.setState({event:res.data});
    })
  }
  componentWillReceiveProps(nextProps){
  }
  render(){
    return(
      <div className="container">
        <h1>Create Event</h1>
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
            <input className="form-control" type="date"
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
            <input className="form-control" type="date"
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
            onClick={this.createEvent}>Create Event</button>
        </div>
      </div>
    );
  }
}
