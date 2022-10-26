import { io } from "socket.io-client";

export const socket = io('http://localhost:9091');

socket.on('connect', () => {
  console.log("connect");
});

export function centralStoreRequisition(callback) {
  socket.on('centralRequisition', () => {
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

export function siteLoanRequest(callback) {
  socket.on('siteLoanRequest', (storeId) => {
    callback(storeId);
  });
}

export function siteLoanApproval(callback) {
  socket.on('siteLoanApproval', (storeId) => {
    callback(storeId);
  });
}

export function siteLoanReturn(callback) {
  socket.on('siteLoanReturn', (storeId) => {
    callback(storeId);
  });
}
