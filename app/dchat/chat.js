import React,{Component} from 'react';
import axios from 'axios';
import $ from 'jquery';
import io from 'socket.io-client';
import './chat.css';

class App extends Component{
  
  constructor(props){
    super(props)
    this.state = {
      messages:[],
      totmsgs:0,
      channelName:"",
      guildName:"",
      lastMsgId:"",
    }
  }
  
  componentDidMount(){
    axios.post("/api/discord/fetchmessages",{
      "channelId":this.props.match.params.channel,
      "lastMsgId":"0"
    }).then( (res) => {
      this.setState({
        messages:res.data.messages,
        totmsgs:res.data.messages.length,
        channelName:res.data.channelName,
        guildName:res.data.guildName,
        lastMsgId:res.data.messages[res.data.messages.length-1]['id']
      })
      this.state.messages.map((item,index,arr)=>{
        $('#messages').prepend($('<li>')
                   .append($('<div>').append($('<h4>').text(item.username+":")).append($('<p>').text(item.content))));
        document.getElementsByTagName('html')[0].scrollTop=document.getElementsByTagName('html')[0].scrollHeight;
        if(index==arr.length-1){
          if(document.getElementsByTagName('li')[0])
            document.getElementsByTagName('li')[0].id="firstli";
        }
      })
    }).catch(function(error){
      console.log(error);
    })
    var socket = io('/dchats');
    $('form').submit((e)=>{
      e.preventDefault(); // prevents page reloading
      socket.emit('message', {"channelId":this.props.match.params.channel,"message":$('#m').val()});
      $('#m').val('');
      return false;
    });
    window.addEventListener("scroll", ()=>{
      if(document.getElementsByTagName('html')[0].scrollTop==0){
        console.log("reach");
        this.updateMessages();
        document.getElementById('loader').style.display="block";
      }
    });
  }
  
  componentDidUpdate(){
    var height=document.getElementById('heading').clientHeight;
    document.getElementById('messages').style.paddingTop=height+"px";
    document.getElementById('loader').style.paddingTop=height+"px";
    var aheight=document.getElementById('aform').clientHeight;
    document.getElementById('messages').style.paddingBottom=aheight+"px";
    document.getElementById('loader').style.display="none";
  }
  
updateMessages = async() => {
    await axios.post("/api/discord/fetchmessages",{
      "channelId":this.props.match.params.channel,
      "lastMsgId":this.state.lastMsgId
    }).then( (res) => {
      this.setState({
        messages:res.data.messages,
        totmsgs:res.data.messages.length,
        channelName:res.data.channelName,
        guildName:res.data.guildName,
        lastMsgId:res.data.messages[res.data.messages.length-1]['id']
      })
      this.state.messages.map((item,index,arr)=>{
        $('#messages').prepend($('<li>')
                   .append($('<div>').append($('<h4>').text(item.username+":")).append($('<p>').text(item.content))));
        if(index==arr.length-1){
          if(document.getElementById('firstli'))
            window.scrollTo(0,document.getElementById('firstli').offsetTop-document.getElementById('heading').clientHeight)
          if(document.getElementsByTagName('li')[0])
            document.getElementsByTagName('li')[0].id="firstli";
        }
      })
      document.getElementById('loader').style.display="none";
    }).catch(function(error){
      console.log(error);
    })
  }
  
  render(){
    var {channelName,guildName} = this.state;
    return(<div style={{/*"overflow":"hidden","position":"absolute"*/}}>
        <div id="heading" style={{"position":"fixed","backgroundColor":"white","width":"100%","padding":"1vh 0vw"}}>
          <h1>{guildName} - {channelName}</h1>
        </div>
        <div id="loader" style={{"textAlign":"center"}}>
          <img style={{"margin":"0vh 1vw","height":"10vh"}} src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif"/>
        </div>
        <ul style={{}} id="messages">
        </ul>
        <form id="aform">
          <input id="m" autoComplete="off" /><button>Send</button>
        </form>
    </div>)
  }
}

export default App;