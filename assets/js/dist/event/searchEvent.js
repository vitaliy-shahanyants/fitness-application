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
export default class SearchEvent extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.searchForEvent = this.searchForEvent.bind(this);
  }
  searchForEvent(search_for){
    let data = new FormData();
    data.append('search_for',search_for);
    axios.post(window.pageURL+"searchForEvent",data).then((res)=>{
      this.setState({events:res.data,
        search_for:search_for});
    })
  }
  render(){
    return(
      <div className="container">
        <h1>Search For Events</h1>
        <div className="form-group row">
          <label className="col-2 col-form-label">Search For Event Name Or Description</label>
          <div className="col-10">
            <input className="form-control" type="text"
            value={this.state.search_for}
            onChange={(e)=>{
              this.searchForEvent(e.target.value);
            }}/>
          </div>
        </div>
        <div className="row">
          <button className="btn btn-primary"
            onClick={this.searchForEvent}>Search</button>
        </div>
        <ListOfEvents events={this.state} />
      </div>
    );
  }
}
class ListOfEvents extends React.Component{
  constructor(props){
    super(props);
    this.state = props.events;

    this.joinEvent = this.joinEvent.bind(this);
    this.clickedEvent - this.clickedEvent.bind(this);
  }
  clickedEvent(id){
    this.setState({clickOnevent:true,clickedEvent_id:id});
  }
  joinEvent(id){
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
                        this.clickedEvent(val.event_id);
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
                        this.joinEvent(val.event_id);
                      }}>
                      Join
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
