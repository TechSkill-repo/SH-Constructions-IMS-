import { io } from "socket.io-client";

export const socket = io('http://localhost:9091');

socket.on('connect', function () {
  console.log("connect");
});

export function centralStoreRequisition(callback) {
  socket.on('centralRequisition', () => {
    console.log('centralRequisition');
    callback();
  });
}

export function adminApproval(callback) {
  socket.on('adminApproval', () => {
    callback();
  });
}

export function siteStoreRequisition(callback) {
  socket.on('siteRequisition', () => {
    callback();
  });
}

export function centralStoreApproval(callback) {
  socket.on('centralApproval', () => {
    callback();
  });
}
