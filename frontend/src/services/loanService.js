import axios from "axios";

export function requestLoan(material) {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:9090/loan/request", material)
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
      .post("http://localhost:9090/loan/lend", material)
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
      .get("http://localhost:9090/loan" + storeId ? `?storeId=${storeId}` : "")
      .then((response) => {
        if (response.status === 200)
          resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function getApprovedLoans(storeId) {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:9090/loan/approved" + storeId ? `?storeId=${storeId}` : "")
      .then((response) => {
        if (response.status === 200)
          resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}