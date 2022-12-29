import axios from "axios";
import {HOST} from "../environments/env";

const getConsumableItem = () => {
  return new Promise((resolve, reject) => {
    return axios.get(HOST + '/inventory/consumable/get')
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      })
  })
};

const getNonConsumableItem = () => {
  return new Promise((resolve, reject) => {
    return axios.get(HOST + '/inventory/non-consumable/get')
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      })
  })
};

const postConsumableItem = (item) => {
  return new Promise((resolve, reject) => {
    return axios.post(HOST + '/inventory/consumable/add', item)
    .then(resp => {
      resolve(resp);
    }).catch(err => {
      reject(err);
    });
  });
};

const postNonConsumableItem = (item) => {
  return new Promise((resolve, reject) => {
    return axios.post(HOST + '/inventory/non-consumable/add', item)
    .then(resp => {
      resolve(resp);
    }).catch(err => {
      reject(err);
    });
  });
};

export { getConsumableItem, getNonConsumableItem, postConsumableItem, postNonConsumableItem };