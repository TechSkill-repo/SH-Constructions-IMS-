import { io } from "socket.io-client";
import { HOST } from "../environments/env";

export const socket = io(HOST);

socket.on('connect', () => {
  console.log("connect");
});

export function centralStoreOverDue(callback) {
  socket.on('centralOverdue', (details) => {
    callback(details);
  });
}

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
