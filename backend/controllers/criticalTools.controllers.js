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
    productId,
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
    productId,
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
      res.status(200).json({ message: "Critical Tools Found", criticalTools });
    }
  });
};

const editCriticalTools = async (req, res) => {
  const {
    mcode,
    mname,
    mdescription,
    entryDate,
    uom,
    make,
    serialNo,
    dueDate,
    productId
  } = req.body;

  const query = db.collection("materials").doc("request").collection("items").where("storeId", "==", storeId);
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach(async (doc) => {
        if (doc.data().category === category && doc.data().mcode === mcode) {
          await db.collection("critical-tools").doc(doc.id).delete();
          await db.collection("critical-tools").doc(doc.id).set({
            mcode,
            mname,
            mdescription,
            entryDate,
            uom,
            make,
            serialNo,
            dueDate,
            productId
          })
        }
      });

      res.status(200).json({ message: "Critical tools Edited" });
    }
  });
}

module.exports = { postCriticalTools, getCriticalTools, editCriticalTools };
