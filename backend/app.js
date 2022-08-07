const express = require("express");
const morgan = require("morgan");
const app = express(); //Create new instance

const PORT = process.env.PORT || 9000;
app.use(express.json()); //allows us to access request body as req.body
app.use(morgan("dev")); //enable incoming request logging in dev mode

app.get("/", (req, res) => {
  res.send("Hello Node World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
