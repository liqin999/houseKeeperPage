import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Prompt,
  Redirect
} from 'react-router-dom';

export default class Members extends React.Component{
	constructor(props) {
	    super(props);
	    this.state={
           
	    }
     }
     componentDidMount(){
      console.log("组件挂载完成")
     }
     componentWillReceiveProps(){
     
     }
     render(){
      	return(
     	 		<div>
     			  this is a member
     			</div>
          )
     }
}