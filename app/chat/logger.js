import React,{Component} from 'react';
import io from 'socket.io-client';
import $ from 'jquery';
import './logger.css'

class App extends Component{
  constructor(props){
    super(props);
  }
  
  componentDidMount(){
    const socket = io();
    const connect = io('/logs');
    connect.on('log', (socket) => {
      $('#messages')
        .append($('<li>')
          .append($('<div>')
            .append($('<h4>')
              .text(socket.username+":"))
            .append($('<p>').
              text(socket.message)
            )
          )
        );
    });
    connect.on('reconnect', (attemptNumber) => {
      console.log("tried");
      connect.on('log', (socket) => {
        $('#messages')
          .append($('<li>')
            .append($('<div>')
              .append($('<h4>')
                .text(socket.username+":"))
              .append($('<p>').
                text(socket.message)
              )
            )
          );
      });
    });
  }
  
  render(){
    return(<div>
        <ul id="messages"></ul>
      </div>)
  }
}

export default App;