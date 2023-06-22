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
    notificationDate,
    remarks,
    storeId,
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
    notificationDate,
    remarks,
    storeId,
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
    productId,
    storeId,
    notificationDate,
    remarks,
  } = req.body;

  const query = db
    .collection("critical-tools")
    .where("serialNo", "==", serialNo);
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach(async (doc) => {
        if (doc.data().mcode === mcode) {
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
            productId,
            storeId,
            notificationDate,
            remarks,
          });
        }
      });

      res.status(200).json({ message: "Critical tools Edited" });
    }
  });
};

const deleteCriticalTools = async () => {
  const { serialNo } = req.body;

  const query = db
    .collection("critical-tools")
    .where("serialNo", "==", serialNo);
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach(async (doc) => {
        if (doc.data().category === category && doc.data().mcode === mcode) {
          await db.collection("critical-tools").doc(doc.id).delete();
        }
      });

      res.status(200).json({ message: "Critical tools Deleted" });
    }
  });
};

module.exports = {
  postCriticalTools,
  getCriticalTools,
  editCriticalTools,
  deleteCriticalTools,
};
