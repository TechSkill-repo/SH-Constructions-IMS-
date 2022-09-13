import axios from "axios";
import { HOST } from "../environments/env";

const requisition = (item) => {
  return new Promise((resolve, reject) => {
    return axios.post(HOST + '/admin/requisition', item)
      .then(resp => {
        resolve(resp);
      }).catch(err => {
        reject(err);
      })
  })
}

const getMaterial = (category) => {
  return new Promise((resolve, reject) => {
    return axios.get(HOST + '/admin/query' + (category ? ('?category=' + category) : ''))
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
  });
}

const putMaterial = (material) => {
  return new Promise((resolve, reject) => {
    return axios.put(HOST + '/admin/edit', material)
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
  });
};

function checkIsIssued(slip_no) {
  return new Promise((resolve, reject) => {
    axios
      .get(HOST + "/admin/check?slip_no=" + slip_no)
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

function issueConsumableMaterial(material) {
  return new Promise((resolve, reject) => {
    axios
      .post(HOST + "/admin/consumable", material)
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

function issueNonConsumableMaterial(material) {
  return new Promise((resolve, reject) => {
    axios
      .post(HOST + "/admin/non-consumable", material)
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

export { getMaterial, requisition, putMaterial, issueConsumableMaterial, issueNonConsumableMaterial, checkIsIssued };