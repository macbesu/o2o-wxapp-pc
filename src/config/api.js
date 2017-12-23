import axios from 'axios';

const prefix = 'http://localhost:3000/api/v1/';
const apiSet = {
  getFoodList: 'foods/',
};
const requestType = ['get', 'post', 'delete', 'patch'];

export default function requestData(url, type) {
  if (!(url && apiSet[url])) {
    return new Promise((resolve, reject) => {reject(`requestData方法的url参数"${url}"有误`)});
  } else if (!(type && requestType.includes(type))) {
    return new Promise((resolve, reject) => {reject(`requestData方法的type参数"${type}"有误`)});
  }
  return axios[type](prefix + apiSet[url])
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return false;
    });
}