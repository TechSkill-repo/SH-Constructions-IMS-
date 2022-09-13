import axios from "axios";
import { HOST } from "../environments/env";

const fetchDetails = (mcode) => {
  return new Promise((resolve, reject) => {
    return axios.get(HOST + '/material/fetch?mcode=' + mcode)
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      });
  });
}

const getMcodes = () => {
  return new Promise((resolve, reject) => {
    return axios.get(HOST + '/material/codes')
      .then(resp => {
        resolve(resp.data);
      }).catch(err => {
        reject(err);
      })
  })
}

export { fetchDetails, getMcodes };