import axios from "axios";
import { HOST } from "../environments/env";

export function checkIsIssued(slip_no) {
  return new Promise((resolve, reject) => {
    axios
      .get(HOST + "/issue/check?slip_no=" + slip_no)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch(err => {
        reject(err);
      })
  });
}

export function checkIsAccepted(slip_no) {
  return new Promise((resolve, reject) => {
    axios
      .get(HOST + "/issue/check/accept?slip_no=" + slip_no)
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch(err => {
        reject(err);
      })
  });
}

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

export function acceptConsumableMaterial(material) {
  return new Promise((resolve, reject) => {
    axios
      .post(HOST + "/issue/consumable/accept", material)
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

export function acceptNonConsumableMaterial(material) {
  return new Promise((resolve, reject) => {
    axios
      .post(HOST + "/issue/non-consumable/accept", material)
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
      .get(HOST + "/issue/consumable?storeId=" + storeId)
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
      .get(HOST + "/issue/non-consumable?storeId=" + storeId)
      .then((response) => {
        if (response.status === 200)
          resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getConsumableAccept(storeId) {
  return new Promise((resolve, reject) => {
    axios
      .get(HOST + "/issue/consumable/accept?storeId=" + storeId)
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

export function getNonConsumbaleAccept(storeId) {
  return new Promise((resolve, reject) => {
    axios
      .get(HOST + "/issue/non-consumable/accept?storeId=" + storeId)
      .then((response) => {
        if (response.status === 200)
          resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const putIssuedMaterial = (material) => {
  return new Promise((resolve, reject) => {
    return axios.put(HOST + '/issue/edit/accept', material)
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
  });
};
