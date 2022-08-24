import axios from "axios";

const getConsumableItem = () => {
  return new Promise((resolve, reject) => {
    return axios.get('http://localhost:9090/inventory/consumable/get')
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      })
  })
};

const getNonConsumableItem = () => {
  return new Promise((resolve, reject) => {
    return axios.get('http://localhost:9090/inventory/non-consumable/get')
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      })
  })
};

const postConsumableItem = (item) => {
  return new Promise((resolve, reject) => {
    return axios.post('http://localhost:9090/inventory/consumable/add', item)
    .then(resp => {
      resolve(resp);
    }).catch(err => {
      reject(err);
    });
  });
};

const postNonConsumableItem = (item) => {
  return new Promise((resolve, reject) => {
    return axios.post('http://localhost:9090/inventory/non-consumable/add', item)
    .then(resp => {
      resolve(resp);
    }).catch(err => {
      reject(err);
    });
  });
};

export { getConsumableItem, getNonConsumableItem, postConsumableItem, postNonConsumableItem };