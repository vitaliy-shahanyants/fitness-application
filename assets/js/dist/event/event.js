import React from 'react';
import axios from 'axios';
import FormData from 'form-data';
import DisplayEvent from './displayEvent.js'
const initialState = {
  events:[],
  search_for:'',
  clickOnevent:false,
  clickedEvent_id:0,
}
export default class Events extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.clickedEvent = this.clickedEvent.bind(this);
    this.getAllOfTheEvents = this.getAllOfTheEvents.bind(this);
    this.getAllOfTheEvents();
  }
  getAllOfTheEvents(){
    let data = new FormData();
    axios.post(window.pageURL+"getAllOfTheEvents").then((res)=>{
      this.setState({events:res.data});
    })
  }
  clickedEvent(id){
    this.setState({clickOnevent:true,clickedEvent_id:id});
  }
  render(){
    return(
      <div className="container">
        <h1>All of the Events I'm part of</h1>
        <ListOfEvents events={this.state}
          clickedEvent={this.clickedEvent}
          updateEvent={this.updateEvent}
          deleteEvent={this.deleteEvent}
         />
      </div>
    );
  }
}
class ListOfEvents extends React.Component{
  constructor(props){
    super(props);
    this.state = props.events;

  }
  componentWillReceiveProps(nextProps){
    this.state = nextProps.events;
  }
  render(){
    return(
      <div>
        {this.state.clickOnevent ?
          <div>
            <DisplayEvent event_id={this.state.clickedEvent_id} />
          </div>
          :
          <div>
            <div className="row">
              <div className="col-3">
                <strong>Event Name</strong>
              </div>
              <div className="col-3">
                <strong>Start and End Date</strong>
              </div>
              <div className="col-6">
                <strong>Description</strong>
              </div>
            </div>

            {this.state.events.map((val,i)=>{
              return(
                <div className="row" key={i}>
                  <div className="col-3">
                    <span role="button"
                      style={{'color':'blue'}}
                      onClick={()=>{
                        this.props.clickedEvent(val.event_id);
                      }}>
                      {val.event_name}
                    </span>
                  </div>
                  <div className="col-3">
                    {val.event_start_date} - {val.event_end_date}
                  </div>
                  <div className="col-6">
                    {val.event_description}
                  </div>
                </div>
              );
            })}
          </div>
        }
      </div>
    );
  }
}
