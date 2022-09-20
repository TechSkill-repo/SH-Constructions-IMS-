const db = require('./db.controllers');

const getMaterials = async (req, res) => {
  const storeId = req.query.storeId;
  let items = [];

  const query = db.collection("stores").doc(storeId).collection("items");
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Items not found" });
    } else {
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      res.status(200).json({
        message: "Items Fetched",
        items
      });
    }
  });
};

const materialDestruct = async (req, res) => {
  const { storeId, mcode, mquantity, empName, empId, Ddate } = req.query;

  const query = db.collection("stores").doc(storeId).collection("items").where("mcode", "==", mcode);
  await query.get().then(querySnapshot => {
    if (querySnapshot => {
      if (querySnapshot.empty) {
        res.status(404).json({ "message": "Material not found" });
      } else {
        querySnapshot.forEach(async doc => {
          const data = doc.data();
          if (parseInt(mquantity) > data.mquantity) {
            res.status(403).json({ "message": "Not enough material quantity" });
          } else {
            data.mquantity = "" + (parseInt(data.mquantity) - parseInt(mquantity));

            await db.collection("stores").doc(storeId).collection("items").doc(doc.id).delete();
            await db.collection("stores").doc(storeId).collection("items").doc(doc.id).set(data);

            const docRef = db.collection("stores").doc(storeId).collection("employees").doc();
            await docRef.set({ empId, empName, mcode, mquantity, Ddate });

            res.status(200).json({ "message": "Material Destroyed" });
          }
        });
      }
    });
  });
}

const getMatetrialDestructs = async (req, res) => {
  const storeId = req.query.storeId;
  const items = [];

  const query = db.collection("stores").doc(storeId).collection("employees");

  await query.get().then(querySnapshot => {
    if (querySnapshot.empty) {
      res.status(404).json({ "message": "Items not found" });
    } else {
      querySnapshot.forEach(doc => {
        items.push(doc.data());
      });

      res.status(200).json({ "message": "Datas fetched", "items": items });
    }
  });
}

module.exports = { getMaterials, materialDestruct, getMatetrialDestructs };
