const db = require("./db.controllers");

const addUser = async (req, res) => {
  const username = req.body.username;
  const role = req.body.role;
  const password = req.body.password; // TODO: make password encrypted
  const sub_role = req.body.sub_role;
  const storeId = req.body.storeId;
  const site_location = req.body.site_location;

  // check if user already exists
  const query = db.collection("users").where("username", "==", username);
  query.get().then(async (querySnapshot) => {
    if (querySnapshot.empty) {
      const docRef = db.collection("users").doc();
      if (sub_role && storeId && site_location)
        await docRef.set({ username, role, sub_role, storeId, site_location, password });
      else
        await docRef.set({ username, role, password });

      res.status(201).json({ message: "User successfully Signed Up" });
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
    if (querySnapshot.empty) {
      res.status(404).json({ message: "User not found" });
    } else {
      querySnapshot.forEach((doc) => {
        if (password == doc.data().password) {
          res.status(200).json({
            message: "Login successful",
            username: username,
            id: doc.id,
            role: doc.data().role,
            sub_role: doc.data().sub_role ? doc.data().sub_role : null,
            site_location: doc.data().site_location ? doc.data().site_location : null,
            storeId: doc.data().storeId ? doc.data().storeId : null
          });
        } else {
          res.status(401).json({ message: "Incorrect password" });
        }
      });
    }
  });
};
module.exports = { addUser, getUser };
