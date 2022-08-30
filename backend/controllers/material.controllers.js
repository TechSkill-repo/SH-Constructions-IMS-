const db = require('./db.controllers');

const requisition = async (req, res) => {
  const { storeId, slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, incharge_name, site_location } = req.body;

  const docRef = db.collection("materials-req").doc();
  await docRef.set({ storeId, slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, incharge_name, site_location });

  res.status(201).json({ "message": "Requisition successful" });
};

const getMaterial = (req, res) => {
  const storeId = req.query.storeId;
  const category = req.query.category;
  let items = [];

  const query = db.collection("materials-req").where("storeId", "==", storeId);
  query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach((doc) => {
        if (doc.data().category === category)
          items.push(doc.data());
      });

      res.status(200).json({
        message: "Material Fetched",
        items
      });
    }
  });
}

const editMaterial = (req, res) => {
  const { storeId, slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, incharge_name, site_location } = req.body;

  const query = db.collection("materials-req").where("storeId", "==", storeId);
  query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach(async (doc) => {
        if (doc.data().category === category && doc.data().mcode === mcode) {
          db.collection("materials-req").delete(doc.id);
          await db.collection("materials-req").doc(doc.id).set({ storeId, slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, incharge_name, site_location })
        }
      });

      res.status(200).json({ message: "Material Request Edited" });
    }
  });
}

module.exports = { requisition, getMaterial, editMaterial };
