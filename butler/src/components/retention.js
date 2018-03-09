/*客户保有量*/
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Prompt,
  Redirect
} from 'react-router-dom';

export default class Retention extends React.Component{
	constructor(props) {
	    super(props);
	    this.state={
	    }
   
     }
    componentDidMount(){//组件挂载完成可以向后台发送请求获得数据
      console.log("组件挂载完成")
     }
     render(){
      	return(
     	 		<div>
     			  this is a Retention
     			</div>
          )
     }
}