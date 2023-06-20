import axios from "axios";
import { HOST } from "../environments/env";

export function getMaterials(storeId) {
  return new Promise((resolve, reject) => {
    axios
      .get(HOST + "/store?storeId=" + storeId)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getMatetrialDestructs(storeId, remark) {
  return new Promise((resolve, reject) => {
    axios
      .get(HOST + "/store/destroy?storeId=" + storeId + ((remark) ? `&remark=true` : ''))
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function materialDestruct(material) {
  return new Promise((resolve, reject) => {
    axios
      .post(HOST + "/store/destroy", material)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}