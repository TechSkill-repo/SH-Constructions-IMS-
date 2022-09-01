import axios from "axios";
import { HOST } from "../environments/env";

const requisition = (item) => {
  return new Promise((resolve, reject) => {
    return axios.post(HOST + '/materials/requisition', item)
      .then(resp => {
        resolve(resp);
      }).catch(err => {
        reject(err);
      })
  })
}

const getMaterial = (storeId, category) => {
  return new Promise((resolve, reject) => {
    return axios.get(HOST + '/materials/query?storeId=' + storeId + '&category=' + category)
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
  });
}

const fetchDetails = (mcode) => {
  return new Promise((resolve, reject) => {
    return axios.get(HOST + '/materials/fetch?mcode=' + mcode)
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
  });
}

const getMcodes = () => {
  return new Promise((resolve, reject) => {
    return axios.get(HOST + '/materials/codes')
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      })
  })
}

const putMaterial = (material) => {
  return new Promise((resolve, reject) => {
    return axios.put(HOST + '/materials/edit', material)
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
  });
};

export { getMaterial, requisition, putMaterial, fetchDetails, getMcodes };