/* eslint-disable no-return-assign */
import base from './base';
import wepy from 'wepy';
import Page from '../utils/Page';
import Lang from '../utils/Lang';
const rand = require('../utils/random.js');
const sign = require('../utils/sign.js');
var appId=wepy.$instance.globalData.appId;

export default class applies extends base {
  /**
   * 申报预约
   */
  static async startApply(applyId,formId,resCode) {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","applyStart"];
    postParams[2]=["applyId",applyId];
    postParams[3]=["formId",formId];
    postParams[4]=["resCode",resCode];
    var signVal=sign.createSign(postParams,appId);//签名

    const url = `${this.baseUrl2}/api/zwzx/applyAudit/auditStart.do?applyId=${applyId}&formId=${formId}&resCode=${resCode}&nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=applyStart`;
    return await this.get(url).then(data => {
      return data == null ? [] : data;
    });
  }

  static async startInterview(param) {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","startInterview"];
    postParams[2]=["applyId",param.applyId];
    postParams[3]=["guideId",param.guideId];
    postParams[4]=["date",param.date];
    postParams[5]=["chooseTime",param.chooseTime];
    console.info('postParams',postParams);
    var signVal=sign.createSign(postParams,appId);//签名

    const url = `${this.baseUrl2}/api/zwzx/interview/startInterview.do?applyId=${param.applyId}&guideId=${param.guideId}&date=${param.date}&chooseTime=${param.chooseTime}&nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=startInterview`;
    console.info('url',url);
    return await this.get(url).then(data => {
      return data == null ? [] : data;
    });
  }

  static async cancelInterview(param) {
    console.info('param',param);
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","cancelInterview"];
    postParams[2]=["applyId",param.applyId];
    postParams[3]=["interviewId",param.interviewId];
    console.info('postParams',postParams);
    var signVal=sign.createSign(postParams,appId);//签名

    const url = `${this.baseUrl2}/api/zwzx/interview/cancelInterview.do?applyId=${param.applyId}&interviewId=${param.interviewId}&nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=cancelInterview`;
    console.info('url',url);
    return await this.get(url).then(data => {
      return data == null ? [] : data;
    });
  }

  static async reApply(applyId,taskId,formId) {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","reApply"];
    postParams[2]=["applyId",applyId];
    postParams[3]=["taskId",taskId];
    postParams[4]=["formId",formId];
    var signVal=sign.createSign(postParams,appId);//签名

    const url = `${this.baseUrl2}/api/zwzx/applyAudit/reApply.do?applyId=${applyId}&taskId=${taskId}&formId=${formId}&nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=reApply`;
    return await this.get(url).then(data => {
      return data == null ? [] : data;
    });
  }

  static async cancelApply(applyId,taskId) {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","cancelApply"];
    postParams[2]=["applyId",applyId];
    postParams[3]=["taskId",taskId];
    var signVal=sign.createSign(postParams,appId);//签名

    const url = `${this.baseUrl2}/api/zwzx/applyAudit/reApply.do?applyId=${applyId}&taskId=${taskId}&nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=cancelApply`;
    return await this.get(url).then(data => {
      return data == null ? [] : data;
    });
  }

  /**
   * 查询部门分类
   */
  static async interviewTime (guideId) {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","interviewTime"];
    postParams[2]=["guideId",guideId];
    console.info('postParams',postParams);
    var signVal=sign.createSign(postParams,appId);//签名

    const url = `${this.baseUrl2}/api/zwzx/interview/interviewTime.do?guideId=${guideId}&nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=interviewTime`;
//    const data="";
    const data = await this.get(url);
    console.info('data',data);
    return data;
//    return this._createInterviewTime(data);
  }

  static _createInterviewTime (data) {
    const list = [];
    for (let i = 1; i <= 5; i++) {
      const dateValue=this.GetDateStr(i);
        const sku = {
          date: dateValue
        };
        list.push(sku);

/*      list.push(...data.map(item => {
          return {
            date: this.GetDateStr(i)
            title: item.name,
            type: item.type
          };
        })
      );
*/
    }
    return list;
  }

  static GetDateStr(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth()+1;//获取当前月份的日期
      var d = dd.getDate();
      return y+"-"+m+"-"+d;
  }  

  static workList(management,guideIdName) {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","workList"];
    var signVal=sign.createSign(postParams,appId);//签名

    const url = `${this.baseUrl2}/api/zwzx/applyAudit/workList.do?nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=workList`;
    return new Page(url, this._processWorkManagementListItem.bind(this,management,guideIdName));
//    return await this.get(url).then(data => {
//      return data == null ? [] : data;
//    });
  }

  static _processWorkManagementListItem(management,guideIdName,apply) {
    const id=apply.management;
    const guideId=apply.guideId;
    apply.managementName = management.find(item => item.id == id).title;
    apply.guideName = guideIdName.find(item => item.id == guideId).guideName;
  }

  /**
   * 分页方法
   */
  static page() {
    const url = `${this.baseUrl}/goods`;
    return new Page(url, this._processGoodsListItem.bind(this));
  }

  static applyList(management,guideIdName,status) {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status",status];
    var signVal=sign.createSign(postParams,appId);//签名

    const url = `${this.baseUrl2}/api/zwzx/apply/applyList.do?nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=`+status;
    return new Page(url, this._processGuideManagementListItem.bind(this,management,guideIdName));
  }

  static applyInterviewList(management,guideIdName,status) {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status",status];
    var signVal=sign.createSign(postParams,appId);//签名

    const url = `${this.baseUrl2}/api/zwzx/apply/applyInterviewList.do?nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=`+status;
    return new Page(url, this._processGuideManagementListItem.bind(this,management,guideIdName));
  }

  static _processGuideManagementListItem(management,guideIdName,apply) {
    const id=apply.management;
    const guideId=apply.guideId;
    apply.managementName = management.find(item => item.id == id).title;
    apply.guideName = guideIdName.find(item => item.id == guideId).guideName;
    if(apply.interviewDate!=null){
      var d = new Date(apply.interviewDate);    //根据时间戳生成的时间对象
      var date = (d.getFullYear()) + "-" + 
             (d.getMonth() + 1) + "-" +
             (d.getDate());
      if(apply.choosTime==1){
        date+=" 09:00--10:30"
      }
      if(apply.choosTime==2){
        date+=" 13:30--15:30"
      }
      apply.date=date;
    }
  }

  static interviewList(management,guideIdName,status) {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status",status];
    var signVal=sign.createSign(postParams,appId);//签名

    const url = `${this.baseUrl2}/api/zwzx/interview/interviewList.do?nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=`+status;
    return new Page(url, this._processGuideListItem.bind(this,guideIdName));
//    return new Page(url);
  }


  /**
   * 获取申报
   */
  static async applyEditList(guideId) {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","applyEditList"];
    postParams[2]=["guideId",guideId];
    var signVal=sign.createSign(postParams,appId);//签名

    const url = `${this.baseUrl2}/api/zwzx/apply/applyEditList.do?guideId=${guideId}&nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=applyEditList`;
    return await this.get(url).then(data => {
      return data == null ? [] : data;
    });
  }

  static _processGuideListItem(guideIdName,interview) {
    const guideId=interview.guideId;
    interview.guideName = guideIdName.find(item => item.id == guideId).guideName;
    var d = new Date(interview.interviewDate);    //根据时间戳生成的时间对象
    var date = (d.getFullYear()) + "-" + 
           (d.getMonth() + 1) + "-" +
           (d.getDate());
    if(interview.choosTime==1){
      date+=" 09:00--10:30"
    }
    if(interview.choosTime==2){
      date+=" 13:30--15:30"
    }
    interview.date=date;
  }

  /**
   *  新增商品分类
   */
  static async addInnerCategories(name) {
    const url = `${this.baseUrl}/goods/inner_category`;
    const param = {
      name: name,
      pid: 0,
      seq: 0
    };
    return await this.post(url, param);
  }

  /**
   * 获取单条商品分类信息
   */
  static async getInnerCategorieId(categoryId) {
    let list = await this.getInnerCategories();
    return list.find((item) => item.id == categoryId);
  }

  /**
   *  更新商品分类
   */
  static async updateInnerCategories(id, name) {
    const url = `${this.baseUrl}/goods/inner_category`;
    const param = {
      name: name,
      id: id,
      pid: 0,
      seq: 0
    };
    return await this.put(url, param);
  }

  /**
   *  删除商品分类
   */
  static async removeInnerCategories(id) {
    const url = `${this.baseUrl}/goods/inner_category/${id}`;
    return await this.delete(url);
  }

  /**
   * 上传图片
   */
  static async upload(filePath,existFile) {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","upload"];
    postParams[2]=["existFile",existFile];
    var signVal=sign.createSign(postParams,appId);//签名
    const url = `${this.baseUrl2}/api/zwzx/doUpload.do?existFile=${existFile}&nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=upload`;
    const param = {
      url,
      filePath,
      name: 'image'
    };
    return await wepy.uploadFile(param);
  }

  /**
   * 创建商品
   */
  static async createApply(apply) {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","createApplies"];
    var signVal=sign.createSign(postParams,appId);//签名

    const url = `${this.baseUrl2}/api/zwzx/createApply.do?nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=createApplies`;
    return await this.post(url, apply);
  }

  /**
   * 更新商品
   */
  static async updateApply(apply) {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","updateApplies"];
    var signVal=sign.createSign(postParams,appId);//签名
    const url = `${this.baseUrl2}/api/zwzx/updateApply.do?nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=updateApplies`;
    return await this.post(url, apply);
  }

  /**
   * 删除申报
   */
  static async remove(id,loginCode) {
    var nonce_str = rand.getRand();//随机数
    var postParams=[];
    postParams[0]=["nonce_str",nonce_str];
    postParams[1]=["status","removeApplies"];
    postParams[2]=["id",id];
    postParams[3]=["dealPersion",loginCode];
    var signVal=sign.createSign(postParams,appId);//签名
    const url = `${this.baseUrl2}/api/zwzx/deleteApply.do?id=${id}&dealPersion=${loginCode}&nonce_str=` + nonce_str + `&sign=` + signVal+ `&status=removeApplies`;
    return await this.get(url);
  }



  /**
   * 商品上架
   */
  static async onSale(goodsId) {
    const url = `${this.baseUrl}/goods/${goodsId}/on_sale`;
    return this.put(url);
  }

  /**
   * 商品下架
   */
  static async offSale(goodsId) {
    const url = `${this.baseUrl}/goods/${goodsId}/off_sale`;
    return this.put(url);
  }

  /** ********************* 内部数据处理方法 ********************* **/

  static _processGoodsDetail(goods) {
    const pictures = goods.images;
    const input = {
      name: goods.name,
      status: goods.status == 0,
      isRecommend: goods.isRecommend == 1,
      globalCid: goods.globalCid,
      innerCid: goods.innerCid,
      goodsId: goods.id
    };
    let skuList;
    const details = goods.goodsDetails ? goods.goodsDetails : [];
    if (goods.goodsSkuInfo == null || goods.goodsSkuInfo.goodsSkuDetails == null) {
      skuList = [{
        price: goods.sellPrice,
        stock: goods.goodsStocks[0].stock,
        sku: null
      }];
    } else {
      skuList = goods.goodsSkuInfo.goodsSkuDetails.map(item => {
        const price = parseFloat(item.goodsSkuDetailBase.price).toFixed(2);
        const sku = item.sku;
        const stock = goods.goodsStocks.find(item => item.sku == sku).stock;
        return {price, sku, stock};
      });
    }
    return {pictures, input, details, skuList};
  }

  /**
   * 处理商品列表数据
   */

  static _processGoodsListItem(goods) {
    this._processGoodsPreview(goods);
    this._processGoodsPriceRange(goods);
    this._processGoodsSkuCount(goods);
    this._processGoodsDate(goods);
  }

  static _processGoodsDate(item) {
    item.createText = Lang.convertTimestapeToDay(item.createTime);
  }

  /**
   * 处理SKU数量
   */
  static _processGoodsSkuCount(item) {
    if (!item.goodsSkuInfo || !item.goodsSkuInfo.goodsSkuDetails) {
      item.skuCount = 0;
    } else {
      item.skuCount = item.goodsSkuInfo.goodsSkuDetails.length;
    }
  }

  /**
   * 处理预览图
   */
  static _processGoodsPreview(item) {
    const images = item.images;
    // 图片处理
    if (images == null || images.length < 1) {
      item.imageUrl = '/images/icons/broken.png"';
    } else if (images[0].url == null) {
      item.imageUrl = '/images/icons/broken.png';
    } else {
      item.imageUrl = images[0].url + '/small';
    }
  }

  /**
   * 处理商品区间
   */
  static _processGoodsPriceRange(detail) {
    if (!detail.goodsSkuInfo || !detail.goodsSkuInfo.goodsSkuDetails) {
      const price = parseFloat(detail.sellPrice).toFixed(2);
      detail.priceText = `￥${price}`;
      return;
    }
    const skuDetails = detail.goodsSkuInfo.goodsSkuDetails;
    let maxPrice = 0;
    let minPrice = Number.MAX_VALUE;

    for (let i in skuDetails) {
      const detail = skuDetails[i].goodsSkuDetailBase;
      maxPrice = Math.max(detail.price, maxPrice).toFixed(2);
      minPrice = Math.min(detail.price, minPrice).toFixed(2);
    }
    detail.maxPrice = maxPrice;
    detail.minPrice = minPrice;
    if (maxPrice != minPrice) {
      detail.priceText = `￥${minPrice} ~ ${maxPrice}`;
    } else {
      detail.priceText = `￥${minPrice}`;
    }
  }

}
