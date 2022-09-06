const db = require("./db.controllers");

const postCriticalTools = async (req, res) => {
  const {
    mcode,
    mname,
    mdescription,
    entryDate,
    uom,
    make,
    serialNo,
    dueDate,
  } = req.body;

  const docRef = db.collection("critical-tools").doc();

  await docRef.set({
    mcode,
    mname,
    mdescription,
    entryDate,
    uom,
    make,
    serialNo,
    dueDate,
  });

  res.status(201).json({ message: "Post Successful" });
};

const getCriticalTools = async (req, res) => {
  const criticalTools = [];
  const query = db.collection("critical-tools");
  query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material in inventory not found" });
    } else {
      querySnapshot.forEach((doc) => {
        criticalTools.push(doc.data());
      });
      res.status(200).json({ message: "Critical Tools Found" });
    }
  });
};

module.exports = { postCriticalTools, getCriticalTools };
