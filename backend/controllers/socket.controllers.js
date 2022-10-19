const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server, { cors: {} });

/* all socket events */
io.on("connection", (socket) => {
    console.log('User connected');

    socket.on('clientCentralRequisition', () => {
        io.emit('centralRequisition', null);
        console.log('centralRequisition');
    });

    socket.on('clientAdminApproval', () => {
        io.emit('adminApproval', null);
        console.log('adminApproval');
    });

    socket.on('clientSiteRequisition', () => {
        io.emit('siteRequisition', null);
        console.log('siteRequisition');
    });

    socket.on('clientCentralApproval', () => {
        io.emit('centralApproval', null);
        console.log('centralApproval');
    });
});

module.exports = { io, server };