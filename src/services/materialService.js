import axios from "axios";
import { HOST } from "../environments/env";

const addMaterial = (material) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(HOST + "/material/add", material)
      .then((resp) => {
        if (resp.status === 201) resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const putMaterial = (material) => {
  console.log(material, "material");
  return new Promise((resolve, reject) => {
    return axios
      .put(HOST + "/material/edit", material)
      .then((resp) => {
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

const getConsumableTotalPrice = (storeId) => {
  return new Promise((resolve, reject) => {
    return axios
      .get(HOST + "/material/total/consumable?storeId=" + storeId)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getNonConsumableTotalPrice = (storeId) => {
  return new Promise((resolve, reject) => {
    return axios
      .get(HOST + "/material/total/non-consumable?storeId=" + storeId)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// debug only: SITE STORE add in inventory
const addSiteConsumable = (material) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(HOST + "/material/debug/add/consumable", material)
      .then((resp) => {
        if (resp.status === 201) resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const addSiteNonConsumable = (material) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(HOST + "/material/debug/add/non-consumable", material)
      .then((resp) => {
        if (resp.status === 201) resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export {
  fetchDetails,
  getMcodes,
  getRequests,
  getMaterials,
  addMaterial,
  getConsumableTotalPrice,
  getNonConsumableTotalPrice,
  putMaterial,
  addSiteConsumable,
  addSiteNonConsumable
};
