import React,{Component} from 'react';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      items: [],
      isLoaded: false,
    }
  }
  
  componentDidMount() {
    fetch('/api/getblogs')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.posts.items,
        })
      
    });
    
  }
  
  render(){
    
    
    var { isLoaded, items } = this.state;
    if(!isLoaded) {
       return <div>Loading...</div>
    }
    else
      return(
        <div className="App">
          <ul>
            {items.map(function(item, index){
              return <li key={index}><a href={item.url} style={{"width":"100%","display":"block","whiteSpace":"nowrap","textOverflow":"ellipsis","overflow":"hidden"}}>{item.title}</a></li>
            })}
          </ul>
        </div>
      );
    }
  }


export default App;
