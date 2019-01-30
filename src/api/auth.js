import base from './base'
import wepy from 'wepy';
const en = require('../utils/aes.js');
const rand = require('../utils/random.js');
const sign = require('../utils/sign.js');
var aesKey=wepy.$instance.globalData.aesKey;
var ivKey= wepy.$instance.globalData.ivKey;
var appId=wepy.$instance.globalData.appId;
var xcxId=wepy.$instance.globalData.xcxId;
var usertype=wepy.$instance.globalData.usertype;

export default class auth extends base {
  /**
   * 检查登录状态
   */
  static isLogin() {
    const loginCode = this.getConfig('login_code');
    return loginCode != null;
  }
  /**
   * 登录
   */
  static async login(param) {
    var aesPassword = en.encrypt(param.password,aesKey,ivKey);//aes密码
    param.password=aesPassword;
    param.usertype=usertype;
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","login"];
    postParams[2]=["xcxId",xcxId];
    var signVal=sign.createSign(postParams,appId);//签名
    const url = `${this.baseUrl2}/api/txsms/login.do?nonce_str=${nonce_str}&sign=${signVal}&status=login&xcxId=${xcxId}`;

//    const url = `${this.baseUrl2}/rest/tokens?username=interfaceuser&password=123456`;

    const data= await this.post(url, param);
    return data;
  }
  /**
  * 用户注册
  */
  static async userRegister(param) {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","userRegister"];
    var signVal=sign.createSign(postParams,appId);//签名

    const url = `${this.baseUrl2}/api/txsms/userRegister.do?nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=userRegister`;
    const data= await this.post(url, param);
    return data.attributes;
  }
  /**
   * 注册状态
   */
  static async registerCode() {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","registerCode"];
    var signVal=sign.createSign(postParams,appId);//签名
    const url = `${this.baseUrl2}/api/zwzx/registerCode.do?nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=registerCode`;
    const data = await this.get(url);
    return data.attributes;
  }
  /**
   * 用户信息
   */
  static async userInfo() {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","userInfo"];
    var signVal=sign.createSign(postParams,appId);//签名
    const url = `${this.baseUrl2}/api/txsms/userInfo.do?nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=userInfo`;
    const data = await this.get(url);
    return data.obj;
  }

  /**
   * 短信验证码登录
   */
  static async smsCodeLogin(phone, code) {
    var openId=wepy.$instance.globalData.auth["openId"];
    console.info("openId",openId);
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","smsCode"];
    postParams[2]=["phone",phone];
    postParams[3]=["userkey",code];
    postParams[4]=["openId",openId];
    postParams[5]=["usertype","exam"];
    var signVal=sign.createSign(postParams,appId);//签名
    const url = `${this.baseUrl2}/api/txsms/smsCodeLogin.do?phone=${phone}&userkey=${code}&openId=${openId}&usertype=exam&nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=smsCode`;
    console.info("url",url);
    const data = await this.get(url);
    return data;
  }


  /**
   * 短信验证码
   */
  static async smsCode (phone) {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","smsCode"];
    postParams[2]=["phone",phone];
    postParams[3]=["usertype","exam"];
    postParams[4]=["xcxId",xcxId];
    var signVal=sign.createSign(postParams,appId);//签名
    const url = `${this.baseUrl2}/api/txsms/smsCode.do?phone=${phone}&usertype=exam&xcxId=${xcxId}&nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=smsCode`;
    const data = await this.get(url);
    return data;
  }
  /**
   * 身份证验证登录
   */
  static async idCardLogin(realname,idcard){
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","idcard"];
    postParams[2]=["idcard",idcard];
    postParams[3]=["usertype",usertype];
    var signVal=sign.createSign(postParams,appId);//签名
    const url = `${this.baseUrl2}/api/txsms/idCardLogin.do?idcard=${idcard}&usertype=${usertype}&`+encodeURI(encodeURI(`realname=${realname}`))+`&nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=idcard`;
    console.info("url:",url);
    const data = await this.get(url);
    return data;
  }
  /**
   * 检查登录情况
   */
  static async check(loginCode) {
    const url = `${this.baseUrl}/auth/check?login_code=${loginCode}`;
    const data = await this.get(url);
    return data.result;
  }

  /**
   * 设置权限值
   */
  static getConfig(key) {
    return wepy.$instance.globalData.auth[key];
  }

  /**
   * 读取权限值
   */
  static async setConfig(key, value) {
    await wepy.setStorage({key: key, data: value});
    wepy.$instance.globalData.auth[key] = value;
  }

  /**
   * 删除权限值
   */
  static async removeConfig(key) {
    wepy.$instance.globalData.auth[key] = null;
    await wepy.removeStorage({key: key});
  }
}
