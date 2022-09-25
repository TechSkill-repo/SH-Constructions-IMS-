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

const getIssuedMaterial = (category) => {
  return new Promise((resolve, reject) => {
    return axios.get(HOST + '/admin/issue/query?category=' + category)
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
  });
}

const getAcceptedMaterial = () => {
  return new Promise((resolve, reject) => {
    return axios.get(HOST + '/admin/accept/query')
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
  });
}

const putMaterial = (material) => {
  return new Promise((resolve, reject) => {
    return axios.put(HOST + '/admin/issue/edit', material)
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
  });
};

const putIssuedMaterial = (material) => {
  return new Promise((resolve, reject) => {
    return axios.put(HOST + '/admin/accept/edit', material)
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
  });
};

function checkIsIssued(slip_no, category) {
  return new Promise((resolve, reject) => {
    axios
      .get(HOST + "/admin/issue/check?slip_no=" + slip_no + "&category=" + category)
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

function checkIsAccepted(slip_no) {
  return new Promise((resolve, reject) => {
    axios
      .get(HOST + "/admin/accept/check?slip_no=" + slip_no)
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
      .post(HOST + "/admin/issue/consumable", material)
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
      .post(HOST + "/admin/issue/non-consumable", material)
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

function acceptConsumableMaterial(material) {
  return new Promise((resolve, reject) => {
    axios
      .post(HOST + "/admin/accept/consumable", material)
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

function acceptNonConsumableMaterial(material) {
  return new Promise((resolve, reject) => {
    axios
      .post(HOST + "/admin/accept/non-consumable", material)
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

export { getMaterial, getIssuedMaterial, getAcceptedMaterial, requisition, putMaterial, putIssuedMaterial, issueConsumableMaterial, issueNonConsumableMaterial, acceptConsumableMaterial, acceptNonConsumableMaterial, checkIsIssued, checkIsAccepted };