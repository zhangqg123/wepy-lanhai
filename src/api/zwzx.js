import base from './base';
import wepy from 'wepy';

export default class zwzx extends base {

  /**
   * 获取实施部门列表
   */
  static async list () {
    const url = `${this.baseUrl2}/api/zwzx/menu.do`;
    const data=await this.get(url);
    return data;
  }
  
  /**
   * 获取广告图片列表
   */
  static async queryAllAdImages () {
    const url = `${this.baseUrl2}/work/cms/queryAllAdImages.do`;
    const data=await this.get(url);
    data.apiAdUpload=`${this.apiAdUpload}`;
    return data;
  }

  /**
   * 查询部门分类
   */
  static management () {
    const url = `${this.baseUrl2}/work/zwzx/menu.do`;
    return this.get(url).then(data => this._createManagement(data));
  }


  static _createManagement (data) {
    const list = [];
    if (data != null) {
      list.push(...data.map(item => {
        return {
          id: item.id,
          title: item.name,
          type: item.type
        };
      }));
    }
    return {
      list: list,
      selectedId: null,
      scroll: false
    };
  }
  /**
   * 查询指南名称
   */
  static guideIdName () {
    const url = `${this.baseUrl2}/work/zwzx/guideIdName.do`;
    return this.get(url).then(data => this._createGuideName(data));
  }

  static _createGuideName (data) {
    const list = [];
    if (data != null) {
      list.push(...data.map(item => {
        return {
          id: item.id,
          guideName: item.guideName
        };
      }));
    }
    return {
      list: list,
      scroll: false
    };
  }

}
