/*客户保有量*/
/*require("./retention.css")*/
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Prompt,
  Redirect
} from 'react-router-dom';
import axios from 'axios';
import {getDomain,mockData} from '../common/config/interface';
import { Row, Col , Select ,Table} from 'antd';
var echarts = require('echarts');

const Option = Select.Option;
require("./retention.css");
export default class Retention extends React.Component{
	constructor(props) {
	    super(props);
	    this.state={
         AccessRight:null,//操作权限
         mainCharts:null,//图表容器
         retentionData:{},//后台返回的数据形式

	    };
      this.handleChangeYear = this.handleChangeYear.bind(this);
      this.handleChangeArea = this.handleChangeArea.bind(this);
      this.handleChangeCompany = this.handleChangeCompany.bind(this);
      this.handleChangePerson = this.handleChangePerson.bind(this);
     }
     //生命周期钩子函数
    componentDidMount(){//组件挂载完成可以向后台发送请求获得数据
      console.log( "111")//setState的异步问题
      this.setState({
        mainCharts:this.refs.mainCharts
      },function(){//在setState的回调的函数里面写具体的请求数据
        var myChart = echarts.init(this.state.mainCharts);
        let  rentionOption = {
    title: {
        text: '管家客户数量'
    },
    tooltip: {
        trigger: 'axis'
    },
    toolbox: {
        feature: {
            dataView: {
                show: false,
                readOnly: false
            },
            restore: {
                show: false
            },
            saveAsImage: {
                show: false
            }
        }
    },
    grid: {
        containLabel: true
    },
    legend: {
        data: ['新增','流失','保有']
    },
    xAxis: [{
        type: 'category',
        axisTick: {
            alignWithLabel: true
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    }],
    yAxis: [{
        type: 'value',
        name: '保有',
        min: 0,
        max: 50,
        position: 'right',
        axisLabel: {
            formatter: '{value} 万'
        }
    }, {
        type: 'value',
        name: '新增',
        min: -3000,
        max: 3000,
        position: 'left'
    },
    {
        type: 'value',
        min: -3000,
        max: 3000,
        position: 'left',

    }
    ],
    series: [
      {
        name: '保有',
        type: 'line',
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'top',
            }
        },
        lineStyle: {
            normal: {
                width: 3,
                shadowColor: 'rgba(0,0,0,0.4)',
                shadowBlur: 10,
                shadowOffsetY: 10
            }
        },
        data: [1, 13, 37, 35, 15, 13, 25, 21, 6, 45, 32, 2]
       }, 
       {
        name: '新增',
        type: 'bar',
        yAxisIndex: 1,
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'top'
            }
        },
        data: [209, 236, 325, 439, 507, 576, 722, 879, 938, 1364, 1806, 1851]
       },
        {
        name: '流失',
        type: 'bar',
        yAxisIndex: 1,
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'bottom'
            }
        },
        data: [-209, -236, -325, -439, -507,-576, -722, -879, -938, -1364, -1806, -851]
       }

    ]
   };
 myChart.setOption(rentionOption);

              
      })
 }

    componentWillReceiveProps(nextProps){
      let that = this;
      let AccessRight = this.props.AccessRight;//变成内部的状态
      this.setState({
           AccessRight
      });
      //向后台请求数据然后渲染到页面中,初始化。
      let params = {
          AccessRight1:nextProps.AccessRight  
      };
      axios({
        method: 'post',
        url: mockData.getRetentionData,
        data: params
      })
      .then(function (response) {
         that.setState({
            retentionData : response.data
         })
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    handleChangeYear(value){
        console.log(value)
    }
    handleChangeArea(value){
        console.log(value)
    }
    handleChangeCompany(value){
        console.log(value)
    }
    handleChangePerson(value){
        console.log(value)
    }
     render(){
      let retentionData = this.state;
      //console.log(document.getElementById('mainCharts'))
     
      //jsx的赋值的形式 在大括号中写值
      let {handleChangeYear,handleChangeArea,handleChangeCompany,handleChangePerson}=this;
      const columns = [{
          title: '月份',
          dataIndex: 'month',
          key: 'month'
        }, {
          title: '1月',
          dataIndex: 'January',
          key: 'January',
        }, {
          title: '2月',
          dataIndex: 'February',
          key: 'February',
        },
        {
          title: '3月',
          dataIndex: 'March',
          key: 'March',
        }, {
          title: '4月',
          dataIndex: 'April',
          key: 'April',
        }, {
          title: '5月',
          dataIndex: 'May',
          key: 'May',
        },
        {
          title: '6月',
          dataIndex: 'June',
          key: 'June',
        }, {
          title: '7月',
          dataIndex: 'July',
          key: 'July',
        }, {
          title: '8月',
          dataIndex: 'August',
          key: 'August',
        },
        {
          title: '9月',
          dataIndex: 'September',
          key: 'September',
        }, {
          title: '10月',
          dataIndex: 'October',
          key: 'October',
        }, {
          title: '11月',
          dataIndex: 'November',
          key: 'November',
        },
        {
          title: '12月',
          dataIndex: 'December',
          key: 'December',
        }];

        const data = [
        {
          key: '1',
          month: '保有',
          January :1,
          February : 2,
          April:3,
          March:4,
          May:5,
          June:6,
          July:7,
          August:8,
          September:9, 
          October: 10,
          November:11,
          December:12
          
        }, 
        {
          key: '2',
          month: '新增',
          January :1,
          February : 2,
          April:3,
          March:4,
          May:5,
          June:6,
          July:7,
          August:8,
          September:9, 
          October: 10,
          November:11,
          December:12
        }, 
        {
          key: '3',
          month: '流失',
          January :1,
          February : 2,
          April:3,
          March:4,
          May:5,
          June:6,
          July:7,
          August:8,
          September:9, 
          October: 10,
          November:11,
          December:12
        }
        ];

        //图标插件显示
        // 使用刚指定的配置项和数据显示图表。
 
      	return(
          <div>
             <Row>
                <Col span="24">
                      <span style={{marginRight:5}}>年度:</span>
                      <Select defaultValue="2018" style={{ width: 120,marginRight:30 }} onChange={handleChangeYear}>
                        <Option value="2016">2016</Option>
                        <Option value="2017">2017</Option>
                        <Option value="2018">2018</Option>
                        <Option value="2019">2019</Option>
                      </Select>
                   
                      <span style={{marginRight:5}}>区域:</span>
                      <Select defaultValue="武汉" style={{ width: 120,marginRight:30 }} onChange={handleChangeArea}>
                        <Option value="北京">北京</Option>
                        <Option value="天津">天津</Option>
                        <Option value="武汉">武汉</Option>
                      </Select>
                 
                        <span style={{marginRight:5}}>分公司:</span>
                        <Select defaultValue="山东" style={{ width: 120,marginRight:30 }} onChange={handleChangeCompany}>
                          <Option value="河南">河南</Option>
                          <Option value="河北">河北</Option>
                      </Select>
                    
                      <span style={{marginRight:5}}>管家姓名:</span>
                      <Select defaultValue="李钦" style={{ width: 120,marginRight:30 }} onChange={handleChangePerson}>
                        <Option value="张三">张三</Option>
                        <Option value="李钦">李钦</Option>
                    </Select>
                </Col>
             </Row>
             <hr />
               <Row style={{marginTop:10}}>
                 <Col span="6">截止到目前（时点）</Col>
               </Row>
             <Row style={{marginTop:10}}>
                  <Col span="6">
                      <span>保有客户分公司最多的是:</span>
                      <span>北京1</span>
                  </Col>
                   <Col span="5">
                      <span>最少的分公司是:</span>
                      <span>北京2</span>
                  </Col>
               </Row>
                <Row style={{marginTop:10}}>
                  <Col span="6">
                      <span>当年累计新增客户最多的是:</span>
                      <span>天津</span>
                  </Col>
                   <Col span="5">
                      <span>最少的分公司是:</span>
                      <span>北京2</span>
                  </Col>
               </Row>
                <Row style={{marginTop:10}}>
                  <Col span="6">
                      <span>当年累计流失客户最多的是:</span>
                      <span>石家庄</span>
                  </Col>
                   <Col span="5">
                      <span>最少的分公司是:</span>
                      <span>北京2</span>
                  </Col>
               </Row>
               
                <Table style={{marginTop:20}} columns={columns} dataSource={data} pagination={false} />
                
                <div style={{marginTop:20}}>
                  <h2 style={{textAlign: "center"}}>客户保有量</h2>
                   <div id="mainCharts" ref="mainCharts" style={{width: 1000,height:400}}></div> 
                </div>
  
          </div>
         
             
         
     	 		
          )
      }
     }
