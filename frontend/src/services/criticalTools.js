import axios from "axios";
import { HOST } from "../environments/env";

const postCriticalTools = (item) => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await axios.post(HOST + "/critical-tools", item);
      resolve(resp);
    } catch (err) {
      reject(err);
    }
  });
};

const getCriticalTools = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const resp = await axios.get(HOST + "/critical-tools");
      resolve(resp.data);
    } catch (err) {
      reject(err);
    }
  });
};

export { postCriticalTools, getCriticalTools };
