const db = require('./db.controllers');

const requisition = async (req, res) => {
  const { storeId, slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, incharge_name, site_location } = req.body;

  const docRef = db.collection("admin").doc("request").collection("items").doc();
  await docRef.set({ storeId, slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, incharge_name, site_location });

  res.status(201).json({ "message": "Requisition successful" });
};

const getMaterial = async (req, res) => {
  const category = req.query.category;
  let items = [];

  const query = db.collection("admin").doc("request").collection("items");
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach((doc) => {
        if (category) {
          if (doc.data().category === category)
            items.push(doc.data());
        } else {
          items.push(doc.data());
        }
      });

      res.status(200).json({
        message: "Material Fetched",
        items
      });
    }
  });
}

const editMaterial = async (req, res) => {
  const { slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, quantity_aprv, incharge_name } = req.body;

  const query = db.collection("admin").doc("request").collection("items");
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach(async (doc) => {
        if (doc.data().category === category && doc.data().mcode === mcode) {
          await db.collection("admin").doc("request").collection("items").doc(doc.id).delete();
          await db.collection("admin").doc("request").collection("items").doc(doc.id).set({ slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, quantity_aprv, incharge_name })
        }
      });

      res.status(200).json({ message: "Material Request Edited" });
    }
  });
}

const issueConsumableMaterial = async (req, res) => {
  const { mcode, quantity_req, quantity_aprv, mname, mdescription, date, uom, slip_no, issue_slip_no } = req.body;

  const query = db.collection("inventory").doc("consumable").collection("items").where("mcode", "==", mcode);
  await query.get().then(async (querySnapshot) => {
    if (querySnapshot.empty) {
      const docRef = db.collection("inventory").doc("consumable").collection("items").doc();
      await docRef.set({ mcode, mname, mdescription, date, uom, total_received: (quantity_aprv.length) ? quantity_aprv : quantity_req, opening_stock: "0", current_stock: (quantity_aprv.length) ? quantity_aprv : quantity_req });
    } else {
      querySnapshot.forEach(async (doc) => {
        const current_stock = parseInt(doc.data().current_stock);

        let data = doc.data();

        data.current_stock = "" + (current_stock + parseInt((quantity_aprv.length) ? quantity_aprv : quantity_req));
        await db.collection("inventory").doc("consumable").collection("items").doc(doc.id).delete();
        await db.collection("inventory").doc("consumable").collection("items").doc(doc.id).set(data);

      });
      const docRef = db.collection("admin").doc("issue").collection("items").doc();
      await docRef.set({ mcode, date, issue_slip_no: issue_slip_no ? issue_slip_no : slip_no, mname, mdescription, uom, mquantity: (quantity_aprv.length) ? quantity_aprv : quantity_req, category: "consumable" });

      res.status(201).json({ "message": "Issue successful" });
    }
  });
};

const issueNonConsumableMaterial = async (req, res) => {
  const { mcode, quantity_req, quantity_aprv, mname, mdescription, date, uom, slip_no, issue_slip_no } = req.body;

  const query = db.collection("inventory").doc("non-consumable").collection("items").where("mcode", "==", mcode);
  await query.get().then(async (querySnapshot) => {
    if (querySnapshot.empty) {
      const docRef = db.collection("inventory").doc("non-consumable").collection("items").doc();
      await docRef.set({ mcode, mname, mdescription, date, uom, total_received: (quantity_aprv.length) ? quantity_aprv : quantity_req, opening_stock: "0", current_stock: (quantity_aprv.length) ? quantity_aprv : quantity_req });
    } else {
      querySnapshot.forEach(async (doc) => {
        const current_stock = parseInt(doc.data().current_stock);

        let data = doc.data();
        data.current_stock = "" + (current_stock + parseInt((quantity_aprv.length) ? quantity_aprv : quantity_req));
        await db.collection("inventory").doc("non-consumable").collection("items").doc(doc.id).delete();
        await db.collection("inventory").doc("non-consumable").collection("items").doc(doc.id).set(data);

      });

    }

    const docRef = db.collection("admin").doc("issue").collection("items").doc();
    await docRef.set({ mcode, date, issue_slip_no: issue_slip_no ? issue_slip_no : slip_no, mname, mdescription, uom, mquantity: (quantity_aprv.length) ? quantity_aprv : quantity_req, category: "non-consumable" });

    res.status(201).json({ "message": "Issue successful" });
  });
};

module.exports = { requisition, getMaterial, editMaterial, issueConsumableMaterial, issueNonConsumableMaterial };
