import axios from 'axios';

export const server = 'http://localhost:3000/';
export const prefix = 'api/v1/';
export const token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTRjZGZkODUxOTVlMjQzYTVmNDVmNjEiLCJpYXQiOjE1MTQ5ODc1MDZ9.VOcj8P4Sg5DMql-DO8OImp9D6uU27vCeu-lKahqFY4';

export const apiSet = {
  foods: 'foods',
  categories: 'categories',
  coupons: 'coupons',
  uploadFile: 'files/upload'
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
  return axios.get(`${server}${prefix}${apiSet[url]}${params?`/${params}`:''}`)
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
  return axios.post(`${server}${prefix}${apiSet[url]}`, data, {
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
  return axios.patch(`${server}${prefix}${apiSet[url]}${params?`/${params}`:''}`, data, {
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

export function requestDeleteData(url, params='') {
  checkValidUrl(url);
  checkValidParams(params);
  return axios.delete(`${server}${prefix}${apiSet[url]}${params?`/${params}`:''}`, {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
}

