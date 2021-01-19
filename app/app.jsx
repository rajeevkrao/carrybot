import React,{Component} from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

import Routes from './route'

render((
    <BrowserRouter>
        <Routes/>
    </BrowserRouter>
), document.getElementById('App'));

class App extends React.Component{
  render(){
    return <div>
      <Facebook/>
    </div>
  }
}

class Facebook extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn:false,
      userID:'',
      name:'',
      email:'',
      profile:''
    }
  }
  
  responseFacebook = (response) =>{
    console.log(response);
  }
  
  componentClicked = () =>{
    console.log("clicked");
  }

  render(){
    let fbContent;
    if(this.state.isLoggedIn){

    }
    else{
      fbContent = (<FacebookLogin
        appId="323969941692841"
        autoLoad={true}
        fields="name,email,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook} />
      )
    }
    return fbContent
  }
}

render((
  <App/>
), document.querySelector('#FB'));

