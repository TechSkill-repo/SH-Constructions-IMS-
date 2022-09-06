import { io } from "socket.io-client";

const socket = io('http://localhost:9091');

socket.on('connect', function () {
  console.log("connect");
});

export function siteStoreRequisition() {
  return new Promise((resolve, reject) => {
    socket.on('siteRequisition', (storeId) => {
      // console.log(storeId);
      resolve(storeId);
    });
  });
}
