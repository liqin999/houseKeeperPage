const environment = {
    devHttp:"http://ca-web.yun300.cn",
    testHttp:'http://data.yun300.cn',
    conHttp:'http://webapp.data.yun300.cn',
    //default:"http://ca-web.yun300.cn",
    default:"http://webapp.data.yun300.cn",
};
//判断接口环境
function getDomain(){
    switch (window.location.host) {
        case 'ca-web.yun300.cn':
            return environment.devHttp;
        case 'data.yun300.cn':
            return environment.testHttp;
        case 'webapp.data.yun300.cn':
            return environment.conHttp;
        default:
            return environment.default;
    }
};

let mockData = {//模拟的假数据
	  //得到权限
      getRight : 'https://www.easy-mock.com/mock/59952ae9059b9c566dc18e2d/getData/getRight',
      //客户保有量
      getRetentionData:'https://www.easy-mock.com/mock/59952ae9059b9c566dc18e2d/getData/getRetentionData',
      //页面头部的筛选项目
      getRetentionSelect:'https://www.easy-mock.com/mock/59952ae9059b9c566dc18e2d/getData/getRetentionSelect',
      //初始化页面数据和点击查询按钮的时候获得数据的地址  
      searchDataUrl:"https://www.easy-mock.com/mock/59952ae9059b9c566dc18e2d/getData/searchDataUrl"
};

export {
    getDomain,
    mockData
}