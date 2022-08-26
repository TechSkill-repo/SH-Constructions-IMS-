import axios from "axios";

export function issueConsumableMaterial(material) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:9090/issue/consumable", material)
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
      .post("http://localhost:9090/issue/non-consumable", material)
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
      .get("http://localhost:9090/issue/consumable/get?storeId=" + storeId)
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
      .get("http://localhost:9090/issue/non-consumable/get?storeId=" + storeId)
      .then((response) => {
        if (response.status === 200)
          resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
