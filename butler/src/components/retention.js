/* 客户保有量 本页面是顶部导航是一个请求，
 * 然后触发导航里面的搜索按钮请求另外的参数进行查询得到页面数据
*/
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
import { Row, Col , Select ,Table,Button ,Icon } from 'antd';
var echarts = require('echarts');
const Option = Select.Option;
require("./retention.css");
export default class Retention extends React.Component{
	constructor(props) {
	    super(props);
	    this.state={//将从后台取道的数据变成组建自己的状态
         AccessRight:null,//操作权限
         mainCharts:null,//图表容器
         year:"",//向后台传递查询参数
         area:"",
         company:"",
         person:"",
         retentionData:{//后台返回的数据
          'year':[],//年份
          'area':[],//区域
          'company':[],//分司
          'person':[],//管家

         },//后台返回的数据形式

	    };
      this.handleChangeValue = this.handleChangeValue.bind(this);
      this.handleChangeYear = this.handleChangeYear.bind(this);
      this.handleChangeArea = this.handleChangeArea.bind(this);
      this.handleChangeCompany = this.handleChangeCompany.bind(this);
      this.handleChangePerson = this.handleChangePerson.bind(this);
      this.handleSearchData = this.handleSearchData.bind(this);
     }
     //生命周期钩子函数
    componentDidMount(){//组件挂载完成可以向后台发送请求获得数据
      console.log( "111")//setState的异步问题
      this.setState({
        mainCharts:this.refs.mainCharts
      },function(){//在setState的回调的函数里面写具体的请求数据
        var myChart = echarts.init(this.state.mainCharts);
 let rentionOption = {//进行异步的请求数据形式
    title: {
        text: ''
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

    handleChangeYear(value){//年份的改变
        console.log(value);
        this.state({
          year:value
        }) 

    }
    handleSearchData(){//点击搜索按钮最终的条件的渲染数据
        let postSelectArg = {
          year:this.state.year,
          area:this.state.area,
          company:this.state.company,
          person:this.state.person
        };
        let that = this;

        let searchDataUrl=mockData.searchDataUrl;

        axios.post(searchDataUrl,postSelectArg)
        .then(function (response) {
          that.setState({
            retentionData:response.data
          })
        })
        .catch(function (error) {
          console.log(error);
       });


    }
    handleChangeValue(value,str){//处理区域，分公司，管家名字
      //像后台发送不同的值，请求不同的数据
      let that = this;
      let selecturl = mockData.getRetentionSelect;
      axios.post(selecturl, {
          value: value,//下拉的值
          str: str//辨别是哪一项下拉
        })
        .then(function (response) {
          that.setState({
            retentionData:{//直接全部的对象进行赋值操作
              "area":response.area,
              "company":response.company,
              "person":response.person,
             },
          })
          console.log(response);

        })
        .catch(function (error) {
          console.log(error);
       });

    }
    handleChangeArea(value){
      this.setState({
        area:value
      });
       
        this.handleChangeValue(value,'area');
    }
    handleChangeCompany(value){
      this.setState({
        company:value
      })
        console.log(value)
        this.handleChangeValue(value,'company');
    }
    handleChangePerson(value){
      this.setState({
        person:value
      })
        console.log(value)
        this.handleChangeValue(value,'person');
    }
     render(){
      let retentionData = this.state;
      //console.log(document.getElementById('mainCharts'))
     
      //jsx的赋值的形式 在大括号中写值
      let {handleChangeYear,handleChangeArea,handleChangeCompany,handleChangePerson,handleSearchData}=this;
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

        //区域数据 region 使用表格的嵌套的形式  使用表格的嵌套 
        //月份英文：January Feburary March April May June July August 
        // September October November December
        const regionColumns = [
          {
            dataIndex: 'name',
            title: '月份(保有/新增/流失)',
            width:150
          }, 
          {
            title: '1月',
            dataIndex: 'January',
          }, 
          {
              title: '2月',
              dataIndex: 'Feburary',
             
          }, 
          {
            title: '3月',
            dataIndex: 'March',
            
          }, 
          {
            title: '4月',
            dataIndex: 'April',
            
          }, 
          {
            title: '5月',
            dataIndex: 'May',
            
          }, 
          {
            title: '6月',
            dataIndex: 'June',
           
          }, 
          {
            title: '7月',
            dataIndex: 'July',
            
          }, 
          {
            title: '8月',
            dataIndex: 'August',
            
          }, 
          {
            title: '9月',
            dataIndex: 'September',
            
          }, 
          {
            title: '10月',
            dataIndex: 'October',
           
          }, 
          {
            title: '11月',
            dataIndex: 'November',
          
          }, 
          {
            title: '12月',
            dataIndex: 'December',
          }
          ];

         const regionData = [
          {
              key: 1,
              name: "总计",
              January: "32/12/56",
              Feburary:"32/12/56" ,
              March: "32/12/56",
              April: "32/12/56",
              May: "32/12/56",
              June:"32/12/56" ,
              July:"32/12/56" ,
              August:"32/12/56",
              September: "32/12/56",
              October: "32/12/56",
              November: "32/12/56",
              December:"32/12/56"
          },
          {
               key: 2,
              name: "京津石",
              January: "32/12/56",
              Feburary:"32/12/56" ,
              March: "32/12/56",
              April: "32/12/56",
              May: "32/12/56",
              June:"32/12/56" ,
              July:"32/12/56" ,
              August:"32/12/56",
              September: "32/12/56",
              October: "32/12/56",
              November: "32/12/56",
              December:"32/12/56"
          },
          {
               key: 3,
              name: "山东区",
              January: "32/12/56",
              Feburary:"32/12/56" ,
              March: "32/12/56",
              April: "32/12/56",
              May: "32/12/56",
              June:"32/12/56" ,
              July:"32/12/56" ,
              August:"32/12/56",
              September: "32/12/56",
              October: "32/12/56",
              November: "32/12/56",
              December:"32/12/56"
          },
          {
             key: 4,
              name: "河南区",
              January: "32/12/56",
              Feburary:"32/12/56" ,
              March: "32/12/56",
              April: "32/12/56",
              May: "32/12/56",
              June:"32/12/56" ,
              July:"32/12/56" ,
              August:"32/12/56",
              September: "32/12/56",
              October: "32/12/56",
              November: "32/12/56",
              December:"32/12/56"
          },
          {
              key: 5,
              name: "河北区",
              January: "32/12/56",
              Feburary:"32/12/56" ,
              March: "32/12/56",
              April: "32/12/56",
              May: "32/12/56",
              June:"32/12/56" ,
              July:"32/12/56" ,
              August:"32/12/56",
              September: "32/12/56",
              October: "32/12/56",
              November: "32/12/56",
              December:"32/12/56"
          }
         ];

        //分司数据 division

        //管家数据 manager

 
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
                       <Button
                       type="primary" 
                       icon="search"
                       onClick={handleSearchData}
                       >搜索
                       </Button>
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
                
                <hr />

                 <h2 
                 style={{"textAlign":"left"}}>
                 区域数据报表:
                  <Button 
                  type="primary" 
                  style={{"backgroundColor":"#65707b","marginLeft":"10px","borderColor":"#65707b"}}
                  icon="download" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
          下载</Button>
          </h2>

                     <Table 
                    columns={regionColumns} 
                    dataSource={regionData}
                    pagination={{ pageSize: 2 }} 
                    scroll={{ y: 240 }} />

          </div>
         
             
         
     	 		
          )
      }
     }
