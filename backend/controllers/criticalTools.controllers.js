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

module.exports = { postCriticalTools };
