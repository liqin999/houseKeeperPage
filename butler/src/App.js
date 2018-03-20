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
import axios from 'axios';
import {getDomain,mockData} from './common/config/interface';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      //0 所有  1总部  2管家  3个人
       AccessRight:"0",
       allPageData:null,//各个组件中的初始化的数据
    }
  }
  componentDidMount(){
    console.log("APP组件挂载完成.");
    //向后台发送请求，判断是总部，管家，分公司
    let getRight = getDomain()+'/customization/inventory/init';
    let that = this;
    axios.get(getRight,{
      //areaId=75&subId=169&perId=14988&pageType=baoyou&year=2017-01
      params: {
         areaId:75,//区域ID
         subId:169,//分司ID
         perId:14988,//个人ID
         pageType:'baoyou',//Tab类型
         year:'2017-01'//查询时间
      }
    })
    .then(function (response) {//获得权限的内容
      let AccessRight =  response.data.data.security.state;
      let allPageData =  response.data.data;
      that.setState({
          AccessRight,
          allPageData
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    let {AccessRight,allPageData} = this.state;//对象的结构赋值
    return (
      <div>
          <Route 
           exact
           path="/retention"
           //在路由中传递参数 render函数形式 将基本的对象和路由信息对象都传递到子组件中
           render={(props) => <Retention {...{AccessRight,props,allPageData}}/>}
           />
          <Route exact path="/members" AccessRight={AccessRight} component={Members}/>
          <Route exact path="/renewal" AccessRight={AccessRight} component={Renewal}/>
          <Route exact path="/userate" AccessRight={AccessRight} component={Userate}/>
      </div>
    );
  }
}

export default App;
