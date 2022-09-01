const db = require('./db.controllers');

const requisition = async (req, res) => {
  const { storeId, slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, incharge_name, site_location } = req.body;

  const docRef = db.collection("materials-req").doc();
  await docRef.set({ storeId, slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, incharge_name, site_location });

  res.status(201).json({ "message": "Requisition successful" });
};

const getMaterial = async (req, res) => {
  const storeId = req.query.storeId;
  const category = req.query.category;
  let items = [];

  const query = db.collection("materials-req").where("storeId", "==", storeId);
  await query.get().then((querySnapshot) => {
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

const fetchDetails = async (req, res) => {
  const mcode = req.query.mcode;

  const query = db.collection("consumable-inv").where("mcode", "==", mcode);
  await query.get().then(async (querySnapshot) => {
    if (querySnapshot.empty) {
      const query = db.collection("non-consumable-inv").where("mcode", "==", mcode);

      await query.get().then((querySnapshot) => {
        if (querySnapshot.empty) {
          res.status(404).json({ message: "Material not found" });
        } else {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            data.category = "non-consumable";

            res.status(200).json({
              message: "Material fetched",
              item: data
            });
          });
        }
      });
    } else {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.category = "consumable";

        res.status(200).json({
          message: "Material fetched",
          item: data
        });
      });
    }
  });
}

const getMcodes = async (req, res) => {
  const items = [];

  let query = db.collection("consumable-inv");
  await query.get().then((querySnapshot) => {
    querySnapshot.forEach(doc => {
      items.push(doc.data().mcode);
    });
  });

  query = db.collection("non-consumable-inv");
  await query.get().then((querySnapshot) => {
    querySnapshot.forEach(doc => {
      items.push(doc.data().mcode);
    });
  });

  res.status(200).json({ "message": "codes fetched", codes: items });
}

const editMaterial = async (req, res) => {
  const { storeId, slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, quantity_aprv, incharge_name, site_location } = req.body;

  const query = db.collection("materials-req").where("storeId", "==", storeId);
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach(async (doc) => {
        if (doc.data().category === category && doc.data().mcode === mcode) {
          db.collection("materials-req").doc(doc.id).delete();
          await db.collection("materials-req").doc(doc.id).set({ storeId, slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, quantity_aprv, incharge_name, site_location })
        }
      });

      res.status(200).json({ message: "Material Request Edited" });
    }
  });
}

module.exports = { requisition, getMaterial, editMaterial, fetchDetails, getMcodes };
