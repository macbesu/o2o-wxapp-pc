import axios from 'axios';

const prefix = 'http://localhost:3000/api/v1/';
const apiSet = {
  /**
   * foods
   */
  getFoodList: 'foods/',
  getFoodById: 'foods/',

  /**
   * categories
   */
  getCategorylist: 'categories/',
};
const requestType = ['get', 'post', 'delete', 'patch'];

export function requestGetData(url, type, params='') {
  if (!(url && apiSet[url])) {
    return new Promise((resolve, reject) => reject(`requestData方法的url参数\`${url}\`有误`));
  } else if (!(type && requestType.includes(type))) {
    return new Promise((resolve, reject) => reject(`requestData方法的type参数\`${type}\`有误`));
  }
  if (params && typeof(params) !== 'string') {
    return new Promise((resolve, reject) => reject(`requestData方法的params参数\`${params}\`类型错误，请传入字符串类型数据`));
  }

  // let moreRequestMsg = '';
  // if (typeof(params) === 'number') {
  //   moreRequestMsg += `${params}`;
  // } else if (typeof(params) === 'string') {
  //   moreRequestMsg += params;
  // } else if (Object.prototype.toString.call(params) === '[object Object]') {
  //   for (let item in params) {
  //   }
  // } else {
  //   return new Promise((resolve, reject) => reject(`requestData方法的params参数"${params}"有误, 请传object(不包含数组和函数)/number/string类型参数`));
  // }
  
  return axios.get(`${prefix}${apiSet[url]}${params}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return false;
    });
}

export function requestPostData(url, type, params='') {

}