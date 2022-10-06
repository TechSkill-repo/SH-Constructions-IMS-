import axios from "axios";
import { HOST } from "../environments/env";

const addMaterial = (material) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(HOST + "/material/add", material)
      .then((resp) => {
        if (resp.status === 201)
          resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getMaterials = () => {
  return new Promise((resolve, reject) => {
    return axios
      .get(HOST + "/material/materials")
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const fetchDetails = (mcode) => {
  return new Promise((resolve, reject) => {
    return axios
      .get(HOST + "/material/fetch?mcode=" + mcode)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getMcodes = () => {
  return new Promise((resolve, reject) => {
    return axios
      .get(HOST + "/material/codes")
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getRequests = () => {
  return new Promise((resolve, reject) => {
    return axios
      .get(HOST + "/material/requests")
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};


const getConsumableTotalPrice = () => {
  return new Promise((resolve, reject) => {
    return axios
      .get(HOST + "/material/total/consumable")
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getNonConsumableTotalPrice = () => {
  return new Promise((resolve, reject) => {
    return axios
      .get(HOST + "/material/total/non-consumable")
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { fetchDetails, getMcodes, getRequests, getMaterials, addMaterial, getConsumableTotalPrice, getNonConsumableTotalPrice };
