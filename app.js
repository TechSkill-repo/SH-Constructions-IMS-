const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const userRoute = require("./routes/user.routes");
const adminRoute = require("./routes/admin.routes");
const storeRoute = require("./routes/store.routes");
const requestRoute = require("./routes/request.routes");
const materialRoute = require("./routes/material.routes");
const inventoryRoute = require("./routes/inventory.routes");
const issueRoute = require("./routes/issue.routes");
const loanRoute = require("./routes/loan.routes");
const criticalRoutes = require("./routes/criticaltools.routes");

// socket
const { Server } = require('socket.io');
const { dueDateNotifier } = require('./utils/index.utils');

const app = express();
// const { server } = require("./controllers/socket.controllers");
const PORT = parseInt(process.env.PORT) || 9090;

app.use(cors());
app.use(express.json()); //allows us to access request body as req.body
app.use(morgan("dev")); //enable incoming request logging in dev mode
app.use("/users", userRoute);
app.use("/admin", adminRoute);
app.use("/store", storeRoute);
app.use("/request", requestRoute);
app.use("/material", materialRoute);
app.use("/inventory", inventoryRoute);
app.use("/issue", issueRoute);
app.use("/loan", loanRoute);
app.use("/critical-tools", criticalRoutes);

app.get("/", (req, res) => {
  res.send("Sh-constructions backend");
});

const appServer = app.listen(PORT, () => {
  console.log(`Server running at ${PORT}!`);
});

const io = new Server(appServer, { cors: {} });

/* all socket events */
io.on("connection", (socket) => {
  console.log('User connected');

  // set due date prober
  dueDateNotifier(io);

  socket.on('clientCentralRequisition', (mname) => {
    io.emit('centralRequisition', mname);
    // console.log('centralRequisition');
  });

  socket.on('clientAdminApproval', (mname) => {
    io.emit('adminApproval', mname);
    // console.log('adminApproval');
  });

  socket.on('clientSiteRequisition', (mname) => {
    io.emit('siteRequisition', mname);
    // console.log('siteRequisition');
  });

  socket.on('clientCentralApproval', (mname) => {
    io.emit('centralApproval', mname);
    // console.log('centralApproval');
  });

  socket.on('clientSiteLoanRequest', ({ storeId, mname }) => {
    io.emit('siteLoanRequest', { storeId, mname });
    // console.log('siteLoanRequest');
  });

  socket.on('clientSiteLoanApproval', ({ storeId, mname }) => {
    io.emit('siteLoanApproval', { storeId, mname });
    // console.log('siteLoanApproval');
  });

  socket.on('clientSiteLoanReturn', ({ storeId, mname }) => {
    io.emit('siteLoanReturn', { storeId, mname });
    // console.log('siteLoanReturn');
  });
});
