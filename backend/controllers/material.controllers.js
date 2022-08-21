const db = require('./db.controllers');

const requisition = async (req, res) => {
  const { storeId, slip_no, mcode, mname, mdescription, date, uom, type, category, quantity_req, incharge_name, site_location } = req.body;

  const docRef = db.collection("materials").doc();
  await docRef.set({ storeId, slip_no, mcode, mname, mdescription, date, uom, type, category, quantity_req, incharge_name, site_location });

  res.status(201).json({ "message": "Requisition successful" });
};

const getMaterial = (req, res) => {
  const storeId = req.query.storeId;
  const type = req.query.type;
  let items = [];

  const query = db.collection("materials").where("storeId", "==", storeId);
  query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach((doc) => {
        if (doc.data().type === type)
          items.push(doc.data());
      });

      res.status(200).json({
        message: "Material Fetched",
        items
      });
    }
  });
}

module.exports = { requisition, getMaterial };
