import React from 'react';
import axios from 'axios';
import Querystring from 'querystring';
import ReactPaginate from 'react-paginate';
import FormData from 'form-data'

const initialState = {
  show_posts:false,
  posts_topic:'',
  post_content:'',
  posts:[],
  temp_posts:[],
  thread_id:0,
  postPageCount:20,

  topic:'',
  send_to:'',
  pageCount:20,
  user:{
    first_name:'',
    last_name:'',
    joined_date:'',
    image:''
  },
  threads:[],
  tempThreads:[]
}
export default class Posts extends React.Component {
  constructor(props){
    super(props);
    this.state = initialState;
    this.getSendTo = this.getSendTo.bind(this);
    this.updateUserThread = this.updateUserThread.bind(this);
    this.onPageChangeElement = this.onPageChangeElement.bind(this);
    this.postOnPageChangeElement = this.postOnPageChangeElement.bind(this);
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
    this.PostsPaginationDetail = this.PaginationDetail;
    this.PostsPaginationDetail.onPageChange = this.postOnPageChangeElement;
    this.createThread = this.createThread.bind(this);
    this.getThreads = this.getThreads.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.sendPost = this.sendPost.bind(this);
    this.updatePostsPaginations = this.updatePostsPaginations.bind(this);
    this.getUser();
    this.getThreads();
  }
  onPageChangeElement(page){
    const counter  = this.countDisplayMessage * page.selected;
    var elements = [];

    for(var i = 0; i < this.countDisplayMessage; i++){
      if((counter+i) <= this.state.threads.length-1){
        elements.push(this.state.threads[i+counter]);
      }else{
        break;
      }
    }
    this.setState({tempThreads:elements})
  }
  postOnPageChangeElement(page){
    const counter  = this.countDisplayMessage * page.selected;
    var elements = [];

    for(var i = 0; i < this.countDisplayMessage; i++){
      if((counter+i) <= this.state.posts.length-1){
        elements.push(this.state.posts[i+counter]);
      }else{
        break;
      }
    }
    this.setState({temp_posts:elements})
  }
  createThread(){
    let data = new FormData();
    data.append('username',this.state.send_to);
    data.append('topic',this.state.topic);
    axios.post(window.pageURL+'addNewThread',data).then((res)=>{
      console.log(res.data);
      this.getUser(this.state.send_to);
      this.getThreads(this.state.send_to);
    });
  }
  getUser(username = ''){
    axios.get(window.pageURL+'postGetUser?username='+username).then((res)=>{
      this.setState({
        user:res.data[0]
      })
    });
  }
  getThreads(username = ''){
    axios.get(window.pageURL+'getThreads?username='+username).then((res)=>{
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
      this.setState({threads:res.data,
        tempThreads:diplsayData,
      pageCount:Math.ceil(res.data.length / this.countDisplayMessage)});
    });
  }
  updateUserThread(){
    return this.state.send_to;
  }
  getSendTo(e,user){
    this.setState({send_to:user});
  }
  getPosts(id,topic){
    axios.get(window.pageURL+'getAllPosts?id='+id).then((res)=>{
      this.setState({show_posts:true,
        posts_topic:topic,
        thread_id:id,
        posts:res.data});
      this.updatePostsPaginations();
    });
  }
  updatePostsPaginations(){
    axios.get(window.pageURL+'getAllPosts?id='+this.state.thread_id).then((res)=>{
      let diplsayData = [];
      if(this.state.posts.length > this.countDisplayMessage){
        for(var i =0;i < 11;i++){
          diplsayData.push(this.state.posts[i]);
        }
      }else{
        for(var i =0;i < this.state.posts.length ;i++){
          diplsayData.push(this.state.posts[i]);
        }
      }
      this.setState({show_posts:true,
        postPageCount:Math.ceil(this.state.posts.length / this.countDisplayMessage),
        thread_id:this.state.thread_id,
        posts:res.data,
        temp_posts:diplsayData});
      //this.updatePostsPaginations();
    });

  }
  sendPost(){
    let data = new FormData();
    data.append('thread_id',this.state.thread_id);
    data.append('post_content',this.state.post_content);
    axios.post(window.pageURL+'makePost',data).then((res)=>{
      this.updatePostsPaginations();
    });
  }
  componentWillUpdate(nextProp,nextState){
    if(nextState.send_to.length > 0 && this.state.send_to != nextState.send_to){
      this.getUser(nextState.send_to);
      this.getThreads(nextState.send_to);
    }
  }
  render(){
    return(
      <div>
        <div className="container">
          <h1 className="text-center">Posts Page</h1>
          <div className="form">
            <h2>Create New Discussion Thread</h2>
            <div className="form-group">
              <label>Choose User</label>
              <ListInput setSendTo={this.getSendTo} />
            </div>
            <div className="form-group">
              <label>Discussion Thread Topic</label>
              <input type="text" className="form-control" onChange={(e)=>{
                  this.setState({topic:e.target.value});
              }} />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" onClick={this.createThread}>Create</button>
            </div>
          </div>
          <hr />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <img id="profile-img" className="profile-img-card" src={"../../assets/img/"+this.state.user.image} />
            </div>
            <div className="col-md-10">
              <div>
                <strong>{this.state.user.first_name + " " + this.state.user.last_name}</strong>
              </div>
              <hr/>
              <p>
                Joined Date: {this.state.user.joined_date}
              </p>
            </div>
          </div>
        </div>
        {!this.state.show_posts ?
          <div className="container">
          <h2>All {this.state.send_to.length > 0 ? this.updateUserThread():'My'} Threads</h2>
            {
              this.state.tempThreads.map((val,i)=>{
                return (<h5 style={{'color':'blue'}} role="button" key={i} onClick={(e)=>{
                  this.getPosts(val.id,val.topic);
                }}>{val.topic}</h5>)
              })
            }
            <ReactPaginate {...this.PaginationDetail} pageCount={this.state.pageCount}/>
          </div>
          :
          <div className="container">
            <h2>All Posts For {this.state.posts_topic}</h2>
            <div className="form">
              <div className="form-group">
                <label>Write a Post</label>
                <textarea className="form-control" onChange={(e)=>{
                  this.setState({'post_content':e.target.value});
                }} value={this.state.post_content}></textarea>
              </div>
              <button className="btn btn-primary" onClick={(e)=>{
                  this.sendPost();
                }}>Post</button>
              <br />
              <br />
              {
                this.state.temp_posts.map((val,i)=>{
                  return(
                    <div key={i} className="row">
                      <div className="col-md-2">
                        <img id="profile-img" style={{width:'50px',height:'50px'}} className="profile-img-card"
                          src={"../../assets/img/"+val.image} />
                        {val.first_name} {val.last_name}
                      </div>
                      <div className="col-md-10">
                        {val.post}
                      </div>
                    </div>
                  )
                })
              }
              <ReactPaginate {...this.PostsPaginationDetail} pageCount={this.state.postPageCount}/>
            </div>
          </div>}
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
