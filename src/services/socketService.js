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
  socket.on('centralRequisition', (mname) => {
    callback(mname);
  });
}

export function adminApproval(callback) {
  socket.on('adminApproval', (mname) => {
    callback(mname);
  });
}

export function siteStoreRequisition(callback) {
  socket.on('siteRequisition', (mname) => {
    callback(mname);
  });
}

export function centralStoreApproval(callback) {
  socket.on('centralApproval', (mname) => {
    callback(mname);
  });
}

export function siteLoanRequest(callback) {
  socket.on('siteLoanRequest', ({ storeId, mname }) => {
    callback({ storeId, mname });
  });
}

export function siteLoanApproval(callback) {
  socket.on('siteLoanApproval', ({ storeId, mname }) => {
    callback({ storeId, mname });
  });
}

export function siteLoanReturn(callback) {
  socket.on('siteLoanReturn', ({ storeId, mname }) => {
    callback({ storeId, mname });
  });
}
