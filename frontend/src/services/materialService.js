import axios from "axios";

const requisition = (item) => {
  return new Promise((resolve, reject) => {
    return axios.post('http://localhost:9090/materials/requisition', item)
      .then(resp => {
        resolve(resp);
      }).catch(err => {
        reject(err);
      })
  })
}

const getMaterial = (storeId, category) => {
  return new Promise((resolve, reject) => {
    return axios.get('http://localhost:9090/materials/query?storeId=' + storeId + '&category=' + category)
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
  });
}

export { getMaterial, requisition };