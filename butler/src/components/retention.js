/* 客户保有量 本页面是顶部导航是一个请求，
 * 然后触发导航里面的搜索按钮请求另外的参数进行查询得到页面数据
 * 点击搜索的时候，拿到后台返回的数据，然后就行重新渲染页面中的数据
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
import { Row, Col , Select ,Table,Button ,Icon ,DatePicker} from 'antd';

const MonthPicker = DatePicker.MonthPicker;
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

         retentionData:{//后台返回的数据  将数据进行整理，写成模拟的ajax形式
          //第一部分的下拉数据
          'year':[],//年份
          'area':[{0:"请选择"}],//区域
          'company':[{0:"请选择"}],//分司
          'person':[{0:"请选择"}],//管家

           //第二部分的统计数据
            "maxAndMin": {
                "rentention": {
                  "max": "",
                  "Min": ""
                },
                "increase": {
                  "max": "",
                  "Min": ""
                },
                "decrease": {
                  "max": "",
                  "Min": ""
                }
            },

           //第四部分图标数据
          'rentionChartOption' : {//进行异步的请求数据形式
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
                //min: 0,
               // max: 50,
                position: 'right',
                axisLabel: {
                    formatter: '{value} 千'
                }
            }, {
                type: 'value',
                name: '新增',
                //min: -3000,
                //max: 3000,
                position: 'left'
            },
            {
                type: 'value',
               // min: -3000,
                //max: 3000,
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
         },

          //第五部分的报表数据
        'fiveRegionColumns' : [
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
          ],

          'fiveRegionData' : [
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
         ],


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
      this.setState({
        mainCharts:this.refs.mainCharts
      },function(){//在setState的回调的函数里面写具体的请求数据
       
     })
    }

    componentDidUpdate(){//组件更新完成之后

    }

    componentWillReceiveProps(nextProps){

      let AccessRight = nextProps.AccessRight;//变成内部的状态
      let retentionData = nextProps.allPageData;

        var myChart = echarts.init(this.refs.mainCharts);
        let char =retentionData.char;

      var newcust = char.cust.slice(0);
      var newadd = char.add.slice(0);
      var newlost = char.lost.slice(0);
      let resultcust = [];
      let resultadd = [];
      let resultlost = [];
      newcust.forEach(function(item){
        resultcust.push(Object.values(item).toString())
      });
       newadd.forEach(function(item){
        resultadd.push(Object.values(item).toString())
      });
        newlost.forEach(function(item){
        resultlost.push(Object.values(item).toString())
      });

        //将流失量变成负值
        resultlost = resultlost.map((item)=>{
          return -parseInt(item)
        });

        resultcust = resultcust.map((item,index)=>{
          let ary = item.toString().split("");
          let len = ary.length;
          ary.splice(ary.length-3,0,".")
          let str = ary.join("")
          return str
        })
        //将从后台接受的echar的数据，改变成真实的数据
        this.state.retentionData.rentionChartOption.series[1].data =resultadd;
        this.state.retentionData.rentionChartOption.series[0].data =resultcust;
        this.state.retentionData.rentionChartOption.series[2].data =resultlost;

        let rentionChartOption = this.state.retentionData.rentionChartOption;
        myChart.setOption(rentionChartOption);


        this.setState({
           AccessRight,
           retentionData,
        }, () => {
          
        })
    }

    handleChangeYear(value){//年份的改变
       
        this.setState({
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
            //retentionData:response.data
          })
        })
        .catch(function (error) {
          console.log(error);
       });


    }
    handleChangeValue(value,str,id){//处理区域，分公司，管家名字
      console.log(value,str)
      //像后台发送不同的值，请求不同的数据
      let that = this;
      let textSelUrl = "/bi-customization/dim/findDim";
      let selecturl = mockData.getRetentionSelect;
      axios.get(textSelUrl, {
          params: {
           id: id,//下拉的id
           type: str//辨别是哪一项下拉
        }
         })
        .then(function (response) {
          that.setState({
            retentionData:{//直接全部的对象进行赋值操作
              "area":[{0:"河南"}],
              "company":response.data.select,
              "person":[{0:"李钦"}],
              "maxAndMin": {
                "rentention": {
                  "max": "",
                  "Min": ""
                },
                "increase": {
                  "max": "",
                  "Min": ""
                },
                "decrease": {
                  "max": "",
                  "Min": ""
                }
            },

            }
           
             
          })
          

        })
        .catch(function (error) {
          console.log(error);
       });

    }
    handleChangeArea(value,obj){
      this.setState({
        area:value
      });

      
      let id = obj.props.id;
      this.handleChangeValue(value,'area',id);
    }
    handleChangeCompany(value,obj){
      this.setState({
        company:value
      })
        let id = obj.props.id;
        this.handleChangeValue(value,'company',id);
    }
    handleChangePerson(value,obj){
      this.setState({
        person:value
      })
        console.log(value)
        let id = obj.props.id;
        this.handleChangeValue(value,'person',id);
    }
     render(){
      //render的时候可以直接从父组件的的props取值，父子组价之间的值的传递
      let retentionData = this.props.allPageData;
      //直接从props中取值，然后在render中使用。看源码。追本溯源
      let maxAndMin = this.state.retentionData.maxAndMin;//对象的结构赋值
      

      let {handleChangeYear,handleChangeArea,handleChangeCompany,handleChangePerson,handleSearchData}=this;
      let area = this.state.retentionData.area;
      let company = this.state.retentionData.company;
      let person = this.state.retentionData.person;
      
      let areaOptions = area.map((item,index )=>{
              return <Option key={Object.keys(item)[0]} id={Object.keys(item)[0]} value={Object.values(item)[0]}>{Object.values(item)[0]}</Option>
            
        });

        let companyOptions = company.map((item,index )=>{
            return <Option key={Object.keys(item)[0]} value={Object.values(item)[0]}>{Object.values(item)[0]}</Option>
        });

        let personOptions = person.map((item,index )=>{
              return <Option key={Object.keys(item)[0]} value={Object.values(item)[0]}>{Object.values(item)[0]}</Option>
        });
        let date=new Date;  
        let currentyear=date.getFullYear(); 
        let yearRange = [];
       
        for(var i = currentyear; i > currentyear-5;i--){
          yearRange.push(i)
        }
       
        let yearOptions = yearRange.map((item,index )=>{
               return <Option key={item} value={item}>{item}</Option>
        });

      	return(
          <div>
             <Row>
                <Col span="24">
                      <span style={{marginRight:5}}>年度:</span>
                      <Select defaultValue="2018" 
                      style={{ width: 120,marginRight:30 }} 
                      onChange={handleChangeYear}
                      >
                        {yearOptions}
                        
                      </Select>
                   
                      <span style={{marginRight:5}}>区域:</span>
                      <Select defaultValue={Object.values(area[0])} 
                      style={{ width: 120,marginRight:30 }}
                       onChange={handleChangeArea}
                       >
                        {areaOptions}
                      </Select>
                 
                        <span style={{marginRight:5}}>分公司:</span>
                        <Select 
                        defaultValue={Object.values(company[0])} 
                        style={{ width: 120,marginRight:30 }} 
                        onChange={handleChangeCompany}>
                          {companyOptions}
                      </Select>
                    
                      <span style={{marginRight:5}}>管家姓名:</span>
                      <Select 
                      defaultValue={Object.values(person[0])} 
                      style={{ width: 120,marginRight:30 }} 
                      onChange={handleChangePerson}
                      >
                        {personOptions}
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
                 <Col span="6">截止到目前:（时点）{new Date().toLocaleDateString()}</Col>
               </Row>
             <Row style={{marginTop:10}}>
                  <Col span="6">
                      <span>保有客户分公司最多的是:</span>
                      <span>{maxAndMin.rentention.max}</span>
                  </Col>
                   <Col span="5">
                      <span>最少的分公司是:</span>
                      <span>{maxAndMin.rentention.Min}</span>
                  </Col>
               </Row>
                <Row style={{marginTop:10}}>
                  <Col span="6">
                      <span>当年累计新增客户最多的是:</span>
                      <span>{maxAndMin.increase.max}</span>
                  </Col>
                   <Col span="5">
                      <span>最少的分公司是:</span>
                       <span>{maxAndMin.increase.Min}</span>
                  </Col>
               </Row>
                <Row style={{marginTop:10}}>
                  <Col span="6">
                      <span>当年累计流失客户最多的是:</span>
                      <span>{maxAndMin.decrease.max}</span>
                  </Col>
                   <Col span="5">
                      <span>最少的分公司是:</span>
                      <span>{maxAndMin.decrease.max}</span>
                  </Col>
               </Row>
                
                <div style={{marginTop:20}}>
                  <h2 style={{textAlign: "center"}}>客户保有量</h2>
                   <div id="mainCharts" 
                   ref="mainCharts" 
                   style={{width: 1000,height:400}}
                   ></div> 
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
                    columns={this.state.retentionData.fiveRegionColumns} 
                    dataSource={this.state.retentionData.fiveRegionData}
                    pagination={{ pageSize: 2 }} 
                    scroll={{ y: 240 }} />

          </div>
         
             
         
     	 		
          )
      }
     }
