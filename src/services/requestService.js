import axios from "axios";
import { HOST } from "../environments/env";

const requisition = (item) => {
  return new Promise((resolve, reject) => {
    return axios.post(HOST + '/request/requisition', item)
      .then(resp => {
        resolve(resp);
      }).catch(err => {
        reject(err);
      })
  })
}

const getMaterial = (storeId, category) => {
  return new Promise((resolve, reject) => {
    return axios.get(HOST + '/request/query?storeId=' + storeId + (category ? '&category=' + category : ''))
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
  });
}

const putMaterial = (material) => {
  return new Promise((resolve, reject) => {
    return axios.put(HOST + '/request/edit', material)
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
  });
};

export { getMaterial, requisition, putMaterial };