import React from 'react';
import axios from 'axios';
import Querystring from 'querystring';
import FormData from 'form-data'
import ReactPaginate from 'react-paginate';
const initialState = {
  message:[],
  searchText:'',
  displayMessage:[],
  pageCount:20,
}
export default class Inbox extends React.Component{
  constructor(props){
    super(props);
    this.state = initialState;
    this.deleteButton = this.deleteButton.bind(this);
    this.updateInbox = this.updateInbox.bind(this);
    this.getInboxFrom = this.getInboxFrom.bind(this);
    this.onPageChangeElement = this.onPageChangeElement.bind(this);
    this.countDisplayMessage = 11;
    this.PaginationDetail = {
      previousLabel: 'previous',
      nextLabel: 'next',
      marginPagesDisplayed: 2,
      pageRangeDisplayed: 5,
      activeClassName: 'active',
      pageClassName:'page-item',
      containerClassName: 'pagination',
      pageLinkClassName: 'page-link',
      nextLinkClassName:'page-link',
      previousLinkClassName:'page-link',
      extraAriaContext:'page-link',
      onPageChange:this.onPageChangeElement,
      breakLabel:<span className="page-link">...</span>,
    }
    this.updateInbox();
  }
  onPageChangeElement(page){
    const counter  = this.countDisplayMessage * page.selected;
    var elements = [];

    for(var i = 0; i < this.countDisplayMessage; i++){
      if((counter+i) <= this.state.message.length-1){
        elements.push(this.state.message[i+counter]);
      }else{
        break;
      }
    }
    this.setState({displayMessage:elements})
  }
  getInboxFrom(){
    const data = Querystring.stringify({username:this.state.searchText});
    axios.post(window.pageURL+'getInboxFrom',data,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then((res) => {
      if(res.data != null){
        this.setState({message:res.data});
      }
    });
  }
  updateInbox(){
    axios.get(window.pageURL+'refreshInbox').then((res) => {
      //this.PaginationDetail.pageCount = Math.ceil(res.data.length / this.countDisplayMessage);
      let diplsayData = [];
      if(res.data.length > this.countDisplayMessage){
        for(var i =0;i < 11;i++){
          diplsayData.push(res.data[i]);
        }
      }else{
        for(var i =0;i < res.data.length ;i++){
          diplsayData.push(res.data[i]);
        }
      }
      this.setState({message:res.data,
        displayMessage:diplsayData,
        pageCount:Math.ceil(res.data.length / this.countDisplayMessage)});
    });
  }
  deleteButton(){
    let data = {};
    this.state.message.map((val,i)=>{
      if(val.marked){
        data = {
            id:val.id
        }
        data =  Querystring.stringify(data);
        axios.post(window.pageURL+'deleteMessages',data,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then((res)=>{
          this.updateInbox();
        });
      }
      return null;
    });
  }
  componentWillUpdate(nextProp,nextState){
    //this.updateInbox();
    this.PaginationDetail.pageCount = Math.ceil(this.state.message.length / this.countDisplayMessage);
  }
  render(){
    return(
      <div style={{'backgroundColor':'rgb(202, 209, 209)'}}>
        <h1 className="text-center">Inbox</h1>
        <div style={{'backgroundColor':'white','margin':'50px'}}>
          <div className="row">
            <div className="col-md-3 col-xs-3">
              <button className="btn btn-danger"
                data-toggle="modal" data-target="#myModal"><i className="fa fa-envelope-o" aria-hidden="true"></i> Compose</button>
            </div>
            <div className="col-md-3 col-xs-3">
              <button className="btn btn-info" onClick={(e)=>{this.updateInbox()}}><i className="fa fa-refresh" aria-hidden="true"></i> Refresh</button>
            </div>
            <div className="col-md-3 col-xs-3">
              <button className="btn btn-danger" onClick={this.deleteButton}><i className="fa fa-ban" aria-hidden="true"></i> Delete Selected</button>
            </div>
            <div className="col-md-3 col-xs-3">
              <input type="text" placeholder="Enter user's username" onChange={(e)=>{
                  this.setState({searchText:e.target.value})
                }} value={this.state.searchText} />
              <button className="btn" onClick={(e)=>{this.getInboxFrom()}}><i className="fa fa-search" aria-hidden="true"></i> Search</button>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-1 col-sm-1 col-xs-1">
                  Mark
                </div>
                <div className="col-md-3 col-sm-3 col-xs-3">
                  <strong>Name</strong>
                </div>
                <div className="col-md-5 col-sm-5 col-xs-5">
                  <strong>Message</strong>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-3">
                  <strong>Date</strong>
                </div>
              </div>
              <br />
              {
                  this.state.displayMessage.map((value,i)=>{
                    return(
                      <div key={value.name + " " + i}>
                        <div className="row">
                          <div className="col-md-1 col-sm-1 col-xs-1">
                            <input type="checkbox" onChange={(e)=>{
                                var message = this.state.message;

                                if(e.target.checked){
                                  message[i].marked = true;
                                }else{
                                  message[i].marked = false;
                                }
                                this.setState({
                                  message:message
                                });
                              }} />
                          </div>
                          <div className="col-md-3 col-sm-3 col-xs-3">
                            {value.first_name + " " + value.last_name}
                          </div>
                          <div className="col-md-5 col-sm-5 col-xs-5">
                            {value.message}
                          </div>
                          <div className="col-md-3 col-sm-3 col-xs-3">
                            {value.date}
                          </div>
                        </div>
                        <hr />
                      </div>
                    )
                  })
              }
              <ReactPaginate {...this.PaginationDetail} pageCount={this.state.pageCount} />
              <ModelCompose refreshInbox={this.updateInbox} />
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    )
  }
}

class ModelCompose extends React.Component{
  constructor(props){
    super(props);
    const initialState = {
      send_to:'',
      message_content:'',
    }
    this.state = initialState;
    this.getSendTo = this.getSendTo.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  getSendTo(e,user){
    this.setState({send_to:user});
  }
  sendMessage(){
    var data = {
      send_to:this.state.send_to,
      message_content:this.state.message_content,
    }
    data =  Querystring.stringify(data);
    axios.post(window.pageURL+'sendMessage',data,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    .then((res)=>{
      this.props.refreshInbox();
    });
  }
  render(){
    return(
      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Send Message</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-4">
                  <h5>Send To</h5>
                </div>
                <div className="col-md-8">
                  <ListInput setSendTo={this.getSendTo} />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-4">
                  <h5>Message</h5>
                </div>
                <div className="col-md-8">
                  <textarea className="form-control"
                    onChange={(e)=>{this.setState({message_content:e.target.value})}}></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.sendMessage}>Send</button>
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

class ListInput extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username_list:'',
      list_of_users:[]
    }
    this.getListOfUsers = this.getListOfUsers.bind(this);
  }
  getListOfUsers(){
    axios.get(window.pageURL+'getListOfUsers/'+this.state.username_list)
    .then((res)=>{
      this.setState({list_of_users:res.data});
    });
  }
  render(){
    return (
      <div className="input-group">
        <input className="form-control" type="text" list="username_list" value={this.state.username_list} onChange={(e)=>{
          var username;
          if(e.target.value.includes(",")){
              username = e.target.value.split(',')[1].trim();
              this.props.setSendTo(e,username);
            }else{
              username = e.target.value;
            }
            this.setState({
              username_list:username
            });
            this.getListOfUsers();
          }} />
        <span className="input-group-addon"><i className="fa fa-search"></i></span>
        <datalist id="username_list">
          {this.state.list_of_users.map((val,i)=>{
            return (<option key={val.first_name + " " + i} value={val.first_name + " " + val.last_name+ ", " +val.username}></option>)
          })}
        </datalist>
      </div>
    )
  }
}
