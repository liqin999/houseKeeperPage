import React, { Component } from 'react';
import 'antd/dist/antd.css';
import Retention from './components/retention.js';
import Members from './components/members.js';
import Renewal from './components/renewal.js';
import Userate from './components/userate.js';
import {
  BrowserRouter as Router,
  Route,
  Link,
  HashRouter 
} from 'react-router-dom';
class App extends Component {
  constructor(props){
    super(props);
    this.state={}
  }
  render() {
    return (
      <div>
          <Route exact path="/retention" component={Retention}/>
          <Route exact path="/members" component={Members}/>
          <Route exact path="/renewal" component={Renewal}/>
          <Route exact path="/userate" component={Userate}/>
      </div>
    );
  }
}

export default App;
