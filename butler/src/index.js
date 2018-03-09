import React from 'react';
import ReactDOM from 'react-dom';
import './common/style/index.css';
import App from './App';
import {
  BrowserRouter as Router,
  Route,
  Link,
  HashRouter 
} from 'react-router-dom';

ReactDOM.render(
	<HashRouter>
	  <div>
	     <Route path="/" component={App}></Route>
	  </div>
    </HashRouter>,
	document.getElementById('root')
);

