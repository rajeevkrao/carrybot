import React,{Component} from 'react';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      arr:[]
    }
  }
  componentDidMount(){
    fetch('/vsarr')
    .then(res => res.json())
    .then(result=>{
      this.setState({
        arr:result.vsarr
      })
    })
    this.state.arr.map(function(item){
      window.open(item);
    })
  }
  render(){
    return (
      <div>Hello!</div>
    )
  }
}

export default App;