import axios from "axios";
import {HOST} from "../environments/env";

export function requestLoan(material) {
  return new Promise((resolve, reject) => {
    axios
      .post(HOST + "/loan/request", material)
      .then((response) => {
        if (response.status === 201) {
          resolve(response.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function lendMaterial(material) {
  return new Promise((resolve, reject) => {
    axios
      .post(HOST + "/loan/lend", material)
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

export function getLoans(storeId) {
  return new Promise((resolve, reject) => {
    axios
      .get((HOST + "/loan") + (storeId ? `?storeId=${storeId}` : ""))
      .then((response) => {
        if (response.status === 200)
          resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getApprovedLoans(storeId, reverse = false) {
  return new Promise((resolve, reject) => {
    axios
      .get((HOST + "/loan/approved") + (storeId ? `?storeId=${storeId}` : "") + (reverse ? `&reverse=true` : ""))
      .then((response) => {
        if (response.status === 200)
          resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}