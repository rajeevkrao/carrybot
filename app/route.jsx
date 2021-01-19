import React,{Component} from 'react';

import { Route, Switch } from'react-router-dom';
import Home from'./components/home';
import VideoSpam from'./pages/VideoSpam';
import Examp from'./pages/examp';
import Login from'./pages/Login';
import Blog from'./Blog/Home';
import logs from'./chat/logger';
import dchat from './dchat/chat';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/videospam' component={VideoSpam}/> 
          <Route exact path='/login' component={Login}/>
          <Route exact path='/logout' component={Examp}/>
          <Route exact path='/logs' component={logs}/>
          <Route exact path='/dchats/:channel' component={dchat}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;