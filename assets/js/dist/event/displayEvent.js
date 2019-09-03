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
export default class DisplayEvent extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.state.event_id = props.event_id;
    this.getCurrentEventDetails = this.getCurrentEventDetails.bind(this);

    this.getCurrentEventDetails();
  }
  getCurrentEventDetails(){
    let data = new FormData();
    data.append('event_id',this.state.event_id);
    axios.post(window.pageURL+"getCurrentEventDetails",data).then((res)=>{
      this.setState({event:res.data});
    })
  }
  componentWillReceiveProps(nextProps){
    this.state.event_id = nextProps.event_id;
    this.getCurrentEventDetails();
  }
  render(){
    return(
      <div className="container">
        <h1>{this.state.event.event_name}</h1>
        <div className="form-group row">
          <label className="col-2 col-form-label">
            Event Status
          </label>
          <div className="col-10">
            <input className="form-control" disabled
              value={this.state.event.event_status} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-2 col-form-label">
            Event Description
          </label>
          <div className="col-10">
            <textarea className="form-control" disabled
              value={this.state.event.event_description}>
            </textarea>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-2 col-form-label">
            Event Location
          </label>
          <div className="col-10">
            <input className="form-control" disabled
              value={this.state.event.event_location} />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-2 col-form-label">
            Event Start Date
          </label>
          <div className="col-4">
            <input className="form-control" disabled
              value={this.state.event.event_start_date} />
          </div>
          <label className="col-2 col-form-label">
            Event End Date
          </label>
          <div className="col-4">
            <input className="form-control" disabled
              value={this.state.event.event_end_date} />
          </div>
        </div>
      </div>
    );
  }
}
