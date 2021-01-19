import React,{Component} from 'react';

class App extends Component{
  componentDidMount(){
    localStorage.removeItem("sid");
    window.location.replace("/");
  }
  render(){
    return (<div>
      </div>)
  }
}

export default App;