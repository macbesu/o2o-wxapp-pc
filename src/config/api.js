import axios from 'axios';

const prefix = 'http://localhost:3000/api/v1/';
const token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTJiZGEyY2M2NjJlMTJjYTgyNGY3MDQiLCJpYXQiOjE1MTMwNTUxODV9.WG5nUZ2otCuBdZEig-XeY9ZdZi9qzoJomb9a5wSCAjo';

const apiSet = {
  /**
   * foods
   */
  getFoodList: 'foods/', // GET
  getFoodById: 'foods/id=', // GET
  createFood: 'foods/', // POST
  updateFood: 'foods/', // PATCH

  /**
   * categories
   */
  getCategorylist: 'categories/',

  /**
   * coupons
   */
  getCouponList: 'coupons/',
};

const checkValidUrl = (url) => {
  if (!(url && apiSet[url])) {
    return new Promise((resolve, reject) => reject(`requestData方法的url参数\`${url}\`有误`));
  }
};

const checkValidParams = (params) => {
  if (params && typeof(params) !== 'string') {
    return new Promise((resolve, reject) => reject(`requestData方法的params参数\`${params}\`类型错误，请传入字符串类型数据`));
  }
};

const checkValidReqData = (data) => {
  if (!Object.prototype.toString.call(data) === '[object Object]') {
    return new Promise((resolve, reject) => reject(`requestData方法的data参数\`${data}\`有误，请传入一个纯对象`));
  } 
};

export function requestGetData(url, params='') {
  checkValidUrl(url);
  checkValidParams(params);
  return axios.get(`${prefix}${apiSet[url]}${params}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
}

export function requestPostData(url, data) {
  checkValidUrl(url);
  checkValidReqData(data);
  return axios.post(`${prefix}${apiSet[url]}`, data, {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export function requestPatchData(url, params='', data) {
  checkValidUrl(url);
  checkValidParams(params);
  checkValidReqData(data);
  return axios.patch(`${prefix}${apiSet[url]}${params}`, data, {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

