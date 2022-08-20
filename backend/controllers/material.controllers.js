const db = require('./db.controllers');

const requisition = async (req, res) => {
  const { slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, incharge_name, site_location } = req.body;

  const docRef = db.collection("materials").doc();
  await docRef.set({ slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, incharge_name, site_location });

  res.status(201).json({ "message": "Requisition successful" });
};

const getMaterial = (req, res) => {
  const slip_no = req.query.slip_no;

  const query = db.collection("materials").where("slip_no", "==", slip_no);
  query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach((doc) => {
        res.status(200).json({
          message: "Material Fetched",
          ...doc.data()
        });
      });
    }
  });
}

module.exports = { requisition, getMaterial };
