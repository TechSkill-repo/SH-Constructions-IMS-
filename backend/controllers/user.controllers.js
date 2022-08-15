const e = require("express");
const db = require("./db.controllers");

const addUser = async (req, res) => {
  const username = req.body.username;
  const role = req.body.role;
  const password = req.body.password; // TODO: make password encrypted

  // check if user already exists
  const query = db.collection("users").where("username", "==", username);
  query.get().then(async (querySnapshot) => {
    if (querySnapshot.empty) {
      const docRef = db.collection("users").doc();
      await docRef.set({ username, role, password });
      res.status(200).json({ message: "User successfully Signed Up" });
    } else {
      res.status(403).json({ message: "user already exists" });
    }
  });
};

const getUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const query = db.collection("users").where("username", "==", username);
  query.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (querySnapshot.empty) {
        req.status(404).json({ message: "User not found" });
      } else {
        if (password == doc.data().password) {
          res.status(200).json({
            message: "Login successful",
            username: username,
            id: doc.id,
            role: doc.data().role,
          });
        } else {
          res.status(401).json({ message: "Incorrect password" });
        }
      }
    });
  });
};
module.exports = { addUser, getUser };
