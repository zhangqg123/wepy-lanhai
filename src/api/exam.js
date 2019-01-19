import base from './base';
import wepy from 'wepy';
import Page from '../utils/Page';
import Lang from '../utils/Lang';
const rand = require('../utils/random.js');
const sign = require('../utils/sign.js');
var appId=wepy.$instance.globalData.appId;

export default class exam extends base {

  static async queryScore (openId,examId) {
    const url = `${this.baseUrl2}/work/exam/queryScore.do?openId=${openId}&examId=${examId}`;
    const data=await this.get(url);
    return data;
  }
  static async queryAllAdImages () {
    const url = `${this.baseUrl2}/work/cms/queryAllAdImages.do`;
    const data=await this.get(url);
    return data;
  }
  static async getMenuList () {
    const url = `${this.baseUrl2}/work/cms/menu.do`;
    const data=await this.get(url);
    return data;
  }
  static async getArticlesList (columnId) {
    const url = `${this.baseUrl2}/work/cms/articles.do?columnId=${columnId}`;
    const data=await this.get(url);
    return data;
  }
  static async queryOneArticles (articleId) {
    const url = `${this.baseUrl2}/work/cms/queryOneArticles.do?articleId=${articleId}`;
    console.info("articleId",articleId);
    const data=await this.get(url);
    return data;
  }
  
  static examList(categories) {
    const url = `${this.baseUrl2}/work/exam/examList.do`;
    console.info("url====",url);
    return new Page(url, this._processExamList.bind(this,categories));
  }

  static _processExamList(categories,item) {
    const id=item.questionColumn;
    item.questionColumnName = categories.find(item => item.id == id).columnName;
  }

  static async columnList () {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","columnList"];
    var signVal=sign.createSign(postParams,appId);
    const url = `${this.baseUrl2}/api/exam/columnList.do?nonce_str=${nonce_str}&sign=${signVal}&status=columnList`;
    var data=await this.get(url);
    return data;
  }
  /**
   * 获取试题
   */
  static async questionList (examId) {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","questionList"];
    postParams[2]=["examId",examId];
    var signVal=sign.createSign(postParams,appId);
    const url = `${this.baseUrl2}/api/exam/questionList.do?nonce_str=${nonce_str}&sign=${signVal}&status=questionList&examId=${examId}`;
    const data=await this.get(url);
    return data;
  }
  
  /**
   * 查询部门分类
   */
  static examList2 () {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","examList"];
    var signVal=sign.createSign(postParams,appId);

    const url = `${this.baseUrl2}/api/exam/examList.do?nonce_str=${nonce_str}&sign=${signVal}&status=examList`;
    console.info("url====",url);
    return this.get(url).then(data => this._createExamList(data));
  }

  static _createExamList (data) {
    const list = [];
    if (data != null) {
      list.push(...data.map(item => {
        return {
          id: item.id,
          examName: item.examName,
          score: item.score
        };
      }));
    }
    return {
      list: list,
      selectedId: null,
      scroll: false
    };
  }


  static async subChoose(param,openId,examId) {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","subChoose"];
    postParams[2]=["param",param];
    postParams[3]=["openId",openId];
    postParams[4]=["examId",examId];
    var signVal=sign.createSign(postParams,appId);

    const url = `${this.baseUrl2}/api/exam/subChoose.do?nonce_str=${nonce_str}&sign=${signVal}&status=subChoose&param=${param}&openId=${openId}&examId=${examId}`;
//    var data= await this.get(url);
    return this.get(url).then(data => this._createExamScore(data));

  }
  
  static _createExamScore (data) {
    var sum=0;
    let answerList;
    answerList = data.map(item => {
      var rightValue=null;
      switch (item.rightAnswer) {
        case '1' : rightValue = 'A';
          break;
        case '2' : rightValue = 'B';
          break;
        case '3' : rightValue = 'C';
          break;
        case '4' : rightValue = 'D';
          break;
      }
      if(item.right=="1"){
        sum++;
      }
      var id = item.id;
      var right = item.right;
      return {id, rightValue, right};
      
    });
    console.info("sum",sum);
    return {
      list: answerList,
      score: sum
    };
  }
}
