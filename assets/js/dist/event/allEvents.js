import React from 'react';
import axios from 'axios';
import FormData from 'form-data';
import UpdateEvent from './updateEvent.js'
const initialState = {
  events:[],
  search_for:'',
  clickOnevent:false,
  clickedEvent_id:0,
}
export default class AllEvents extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.updateEvent = this.updateEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.clickedEvent = this.clickedEvent.bind(this);
    this.getAllMyEvents = this.getAllMyEvents.bind(this);
    this.getAllMyEvents();
  }
  updateEvent(id){

  }
  getAllMyEvents(){
    let data = new FormData();
    axios.post(window.pageURL+"getAllMyEvents").then((res)=>{
      this.setState({events:res.data});
    })
  }
  deleteEvent(id){
    let data = new FormData(id);
    data.append('event_id',id);
    axios.post(window.pageURL+"deleteEvent",data).then((res)=>{
      this.getAllMyEvents();
    })
  }
  clickedEvent(id){
    console.log("Clicked the thing");
    this.setState({clickOnevent:true,clickedEvent_id:id});
  }
  render(){
    return(
      <div className="container">
        <h1>All My Event</h1>
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
    this.joinEvent = this.joinEvent.bind(this);
  }
  joinEvent(){
    let data = new FormData();
    data.append('event_id',id);
    axios.post(window.pageURL+"joinEvent",data).then((res)=>{

    })
  }
  componentWillReceiveProps(nextProps){
    this.state = nextProps.events;
  }
  render(){
    return(
      <div>
        {this.state.clickOnevent ?
          <div>
            <div>
              <button className="btn btn-primary"
                onClick={(e)=>{
                  this.joinEvent(this.state.clickedEvent_id);
                }}>Join</button>
            </div>
            <UpdateEvent event_id={this.state.clickedEvent_id} />
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
              <div className="col-4">
                <strong>Description</strong>
              </div>
              <div className="col-2">

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
                  <div className="col-4">
                    {val.event_description}
                  </div>
                  <div className="col-2">
                    <button className="btn btn-primary"
                      onClick={(e)=>{
                        this.props.deleteEvent(val.event_id);
                      }}>
                      Delete
                    </button>
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
