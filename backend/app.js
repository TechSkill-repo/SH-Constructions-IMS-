const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const userRoute = require("./routes/user.routes");
const adminRoute = require("./routes/admin.routes");
const requestRoute = require("./routes/request.routes");
const materialRoute = require("./routes/material.routes");
const inventoryRoute = require("./routes/inventory.routes");
const issueRoute = require("./routes/issue.routes");
const loanRoute = require("./routes/loan.routes");

const app = express();
const PORT = process.env.PORT || 9090;

app.use(cors());
app.use(express.json()); //allows us to access request body as req.body
app.use(morgan("dev")); //enable incoming request logging in dev mode
app.use("/users", userRoute);
app.use("/admin", adminRoute);
app.use("/request", requestRoute);
app.use("/material", materialRoute);
app.use("/inventory", inventoryRoute);
app.use("/issue", issueRoute);
app.use("/loan", loanRoute);

app.get("/", (req, res) => {
  res.send("Sh-constructions backend");
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}!`);
});
