import axios from "axios";
import { HOST } from "../environments/env";

const postCriticalTools = (
  mcode,
  mname,
  mdescription,
  entryDate,
  uom,
  make,
  serialNo,
  dueDate
) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(
        HOST + "/critical-tools",
        mcode,
        mname,
        mdescription,
        entryDate,
        uom,
        make,
        serialNo,
        dueDate
      )
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { postCriticalTools };
