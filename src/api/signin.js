import base from './base'
import wepy from 'wepy';
const en = require('../utils/aes.js');
const rand = require('../utils/random.js');
const sign = require('../utils/sign.js');
const Calendar = require('../utils/Calendar.js');
var aesKey=wepy.$instance.globalData.aesKey;
var ivKey= wepy.$instance.globalData.ivKey;
var appId=wepy.$instance.globalData.appId;

export default class signin extends base {

  static async jscode2session () {
    const res = await wepy.login();
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","jscode2session"];
    postParams[2]=["jscode",res.code];
    var signVal=sign.createSign(postParams,appId);//签名
    const url = `${this.baseUrl2}/api/signin/getOpenid.do?jscode=${res.code}&nonce_str=${nonce_str}&sign=${signVal}&status=jscode2session`;
    return await this.get(url).then(data => {
      return data == null ? [] : data;
    });

  }
  static async loadCalendar(paramDate){
    return this.initCalendar(paramDate);
  }
  /**
   * 初始化日历，
   * signDates ： 已经签到的日期，一般在月份切换的时候从后台获取日期，
   * 然后在获取日历数据时，进行数据比对处理；
   * */
  static async initCalendar (paramDate, signDates) {

    //从服务器端获取signDates
    var paramMonth = paramDate.getMonth();
    if (paramMonth + 1 > 12){//后台保存的月份数据是 1-12
      paramMonth = 1;
    }else{
      paramMonth += 1;
    }
    var paramYear = paramDate.getFullYear();
    var openId=wepy.$instance.globalData.auth["openId"];
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","initCalendar"];
    postParams[2]=["openid",openId];
    postParams[3]=["year",paramYear];
    postParams[4]=["month",paramMonth];
    var signVal=sign.createSign(postParams,appId);//签名
    const url = `${this.baseUrl2}/api/signin/getSignDates.do?openid=${openId}&year=${paramYear}&month=${paramMonth}&nonce_str=${nonce_str}&sign=${signVal}&status=initCalendar`;
    console.info("url=====",url);
    return this.get(url).then(data => this._createSignDate(paramDate,data));
  }

  static _createSignDate (paramDate,data) {
    var signDates  = data;
      //当前年月日
      var now = new Date();//当前时间
      var nowMonth = now.getMonth();
      var nowYear = now.getFullYear();

      var showSign = false;//是否显示签到按钮
      if (nowMonth === paramDate.getMonth()
        && nowYear === paramDate.getFullYear()) {
        showSign = true;
      }

      //未来签到日期设置为空
      if (nowMonth < paramDate.getMonth()
        && nowYear <= paramDate.getFullYear()) {
        signDates = [];
      }

      //星期
      var days = ["日", "一", "二", "三", "四", "五", "六"];

      //签到日历数据的生成
      var calendars = Calendar.getSignCalendar(paramDate, signDates);
    return {
      signDates: signDates,
      year: paramDate.getFullYear(),
      month: paramDate.getMonth() + 1,
      calendars: calendars,
      days: days,
      preMonth: "<",   //大于、小于号不可以直接写在wxml中
      nextMonth: ">",
      showSign: showSign
    };
  }

  //上个月
  static async preMonth (dataYear, dataMonth) {
//    var dataYear = this.signData.year;
//    var dataMonth = this.signData.month - 2;//月是从0开始的
    var paramDate = Calendar.parseDate(dataYear, dataMonth);
//    return paramDate;
    return this.initCalendar(paramDate);
  }

  //下个月
  static async nextMonth (dataYear,dataMonth) {
    var paramDate = Calendar.parseDate(dataYear, dataMonth);
    return this.initCalendar(paramDate);
  }

  //签到
  static async doSign () {
    var openId=wepy.$instance.globalData.auth["openId"];
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","doSign"];
    postParams[2]=["openid",openId];
    var signVal=sign.createSign(postParams,appId);//签名
    const url = `${this.baseUrl2}/api/signin/doSign.do?openid=${openId}&nonce_str=${nonce_str}&sign=${signVal}&status=doSign`;
    console.info("url=====",url);
    const data = await this.get(url);
    if(data=="success"){
      var now = new Date();//当前时间
      return this.initCalendar(now);      
    }else{
      if(data=="already"){
        return "already";
      }
      return false;
    }
    // 调用服务器端，实现签到入库
/*    wx.request({
      url: '${this.baseUrl2}/signin/rest.do?doSign',
      data: {
        openid: app.globalData.openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        // 签到成功给出提示
        wx.showToast({
          title: '签到成功',
          icon: 'success',
          duration: 2000
        }) 
        //刷新日历
        var now = new Date();//当前时间
        this.initCalendar(now);
      },
      fail: function (res) {
        console.log(res);
      }
    });
*/
  };
}