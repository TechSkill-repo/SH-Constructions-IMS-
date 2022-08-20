import axios from "axios";

const getMaterial = (storeId) => {
  return new Promise(
    axios.get('http://localhost:9090/materials/query?storeId=' + storeId)
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      })
  );
}

export { getMaterial };