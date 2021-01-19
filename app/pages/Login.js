import React,{Component} from 'react';
import axios from 'axios';
import qs from 'query-string';


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: {}
    }
  }
  componentDidMount() {
    const values = qs.parse(window.location.search)
    localStorage.setItem("sid",values.token);
    window.location.replace("/");
  }
  render(){
    return (<div>

      </div>)
  }
}

export default App;