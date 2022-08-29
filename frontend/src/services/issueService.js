import axios from "axios";
import {HOST} from "../environments/env";

export function issueConsumableMaterial(material) {
  return new Promise((resolve, reject) => {
    axios
      .post(HOST + "/issue/consumable", material)
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

export function issueNonConsumableMaterial(material) {
  return new Promise((resolve, reject) => {
    axios
      .post(HOST + "/issue/non-consumable", material)
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

export function getConsumableIssue(storeId) {
  return new Promise((resolve, reject) => {
    axios
      .get(HOST + "/issue/consumable/get?storeId=" + storeId)
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

export function getNonConsumbaleIssue(storeId) {
  return new Promise((resolve, reject) => {
    axios
      .get(HOST + "/issue/non-consumable/get?storeId=" + storeId)
      .then((response) => {
        if (response.status === 200)
          resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
