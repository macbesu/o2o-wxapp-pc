import axios from 'axios';

export const SERVER = 'http://localhost:3000/';
export const PREFIX = 'api/v1/';
export const TOKEN = localStorage.getItem('token') || null;


export const APISET = {
  foods: 'foods',
  categories: 'categories',
  orders: 'orders',
  coupons: 'coupons',
  users: 'users',
  uploadFile: 'files/uploadMenu',
};

const checkValidUrl = (url) => {
  if (!(url && APISET[url])) {
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
  return axios.get(`${SERVER}${PREFIX}${APISET[url]}${params?`/${params}`:''}`, {
    headers: {
      Authorization: TOKEN,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
}

export function requestPostData(url, params='', data) {
  checkValidUrl(url);
  checkValidParams(params);
  checkValidReqData(data);
  return axios.post(`${SERVER}${PREFIX}${APISET[url]}${params?`/${params}`:''}`, data, {
    headers: {
      Authorization: TOKEN,
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
  return axios.patch(`${SERVER}${PREFIX}${APISET[url]}${params?`/${params}`:''}`, data, {
    headers: {
      Authorization: TOKEN,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

export function requestDeleteData(url, params='') {
  checkValidUrl(url);
  checkValidParams(params);
  return axios.delete(`${SERVER}${PREFIX}${APISET[url]}${params?`/${params}`:''}`, {
    headers: {
      Authorization: TOKEN,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
}

