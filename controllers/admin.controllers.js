const db = require('./db.controllers');

const requisition = async (req, res) => {

  const { storeId, slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, incharge_name, site_location } = req.body;

  const docRef = db.collection("admin").doc("request").collection("items").doc();
  await docRef.set({ storeId, slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, incharge_name, site_location, issued: false });

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

const getIssuedMaterial = async (req, res) => {
  const category = req.query.category;
  let items = [];

  const query = db.collection("admin").doc("issue").collection(category);
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      res.status(200).json({
        message: "Material Fetched",
        items
      });
    }
  });
};

const getAcceptedMaterial = async (req, res) => {
  let items = [];

  const query = db.collection("admin").doc("issue").collection("accept");
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      res.status(200).json({
        message: "Material Fetched",
        items
      });
    }
  });
};

const editMaterial = async (req, res) => {
  const { slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, quantity_aprv } = req.body;

  const query = db.collection("admin").doc("request").collection("items");
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach(async (doc) => {
        if (doc.data().category === category && doc.data().mcode === mcode && doc.data().slip_no === slip_no) {
          await db.collection("admin").doc("request").collection("items").doc(doc.id).delete();
          await db.collection("admin").doc("request").collection("items").doc(doc.id).set({ slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, quantity_aprv })
        }
      });

      res.status(200).json({ message: "Material Request Edited" });
    }
  });
};

const editIssuedMaterial = async (req, res) => {
  const { slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, quantity_aprv, quantity_acpt } = req.body;

  const query = db.collection("admin").doc("issue").collection(category);
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material not found" });
    } else {
      querySnapshot.forEach(async (doc) => {
        if (doc.data().mcode === mcode && doc.data().slip_no === slip_no) {
          await db.collection("admin").doc("issue").collection(category).doc(doc.id).delete();
          await db.collection("admin").doc("issue").collection(category).doc(doc.id).set({ slip_no, mcode, mname, mdescription, date, uom, category, quantity_req, quantity_aprv, quantity_acpt });
        }
      });

      res.status(200).json({ message: "Material Issue Edited" });
    }
  });
};

const checkIsAccepted = async (req, res) => {
  const { slip_no } = req.query;

  const query = db.collection("admin").doc("issue").collection("accept").where("slip_no", "==", slip_no);

  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(200).json({ "accepted": false });
    } else {
      res.status(200).json({ "accepted": true });
    }
  });
};

const issueConsumableMaterial = async (req, res) => {
  const { mcode, quantity_req, quantity_aprv, mname, mdescription, date, uom, slip_no } = req.body;

  const query = db.collection("admin").doc("request").collection("items").where("slip_no", "==", slip_no);
  await query.get().then(querySnapshot => {
    querySnapshot.forEach(async doc => {
      await db.collection("admin").doc("request").collection("items").doc(doc.id).delete();
      await db.collection("admin").doc("request").collection("items").doc(doc.id).set({ slip_no, mcode, mname, mdescription, date, uom, category: "consumable", quantity_req, quantity_aprv, issued: true });
    });
  });

  const docRef = db.collection("admin").doc("issue").collection("consumable").doc();
  await docRef.set({ mcode, date, slip_no, mname, mdescription, uom, quantity_req, quantity_aprv, category: "consumable" });

  res.status(201).json({ "message": "Issue successful" });
};

const issueNonConsumableMaterial = async (req, res) => {
  const { mcode, quantity_req, quantity_aprv, mname, mdescription, date, uom, slip_no } = req.body;

  const query = db.collection("admin").doc("request").collection("items").where("slip_no", "==", slip_no);
  await query.get().then(querySnapshot => {
    querySnapshot.forEach(async doc => {
      await db.collection("admin").doc("request").collection("items").doc(doc.id).delete();
      await db.collection("admin").doc("request").collection("items").doc(doc.id).set({ slip_no, mcode, mname, mdescription, date, uom, category: "non-consumable", quantity_req, quantity_aprv, issued: true });
    });
  });

  const docRef = db.collection("admin").doc("issue").collection("non-consumable").doc();
  await docRef.set({ mcode, date, slip_no, mname, mdescription, uom, quantity_req, quantity_aprv, category: "non-consumable" });

  res.status(201).json({ "message": "Issue successful" });
};

const acceptConsumableMaterial = async (req, res) => {
  const { mcode, quantity_req, quantity_aprv, quantity_acpt, mname, mdescription, date, uom, slip_no } = req.body;

  const query = db.collection("inventory").doc("consumable").collection("items").where("mcode", "==", mcode);
  await query.get().then(async (querySnapshot) => {
    if (querySnapshot.empty) {
      const docRef = db.collection("inventory").doc("consumable").collection("items").doc();
      await docRef.set({ mcode, mname, mdescription, date, uom, total_received: (quantity_acpt.length) ? quantity_acpt : quantity_aprv, opening_stock: "0", current_stock: (quantity_acpt.length) ? quantity_acpt : quantity_aprv });
    } else {
      querySnapshot.forEach(async (doc) => {
        const current_stock = parseInt(doc.data().current_stock);

        let data = doc.data();

        data.current_stock = "" + (current_stock + parseInt((quantity_acpt.length) ? quantity_acpt : quantity_aprv));
        await db.collection("inventory").doc("consumable").collection("items").doc(doc.id).delete();
        await db.collection("inventory").doc("consumable").collection("items").doc(doc.id).set(data);

      });
    }

    let query = db.collection("admin").doc("request").collection("items").where("slip_no", "==", slip_no);
    await query.get().then(querySnapshot => querySnapshot.forEach(async doc => {
      await db.collection("admin").doc("request").collection("items").doc(doc.id).delete();
    }));

    query = db.collection("admin").doc("issue").collection("consumable").where("slip_no", "==", slip_no);
    await query.get().then(querySnapshot => querySnapshot.forEach(async doc => {
      await db.collection("admin").doc("issue").collection("consumable").doc(doc.id).delete();
    }));

    const docRef = db.collection("admin").doc("issue").collection("accept").doc();
    await docRef.set({ mcode, quantity_req, quantity_aprv, quantity_acpt, mname, mdescription, date, uom, slip_no, category: "consumable" });

    res.status(201).json({ "message": "Accept successful" });
  });
};

const acceptNonConsumableMaterial = async (req, res) => {
  const { mcode, quantity_req, quantity_aprv, quantity_acpt, mname, mdescription, date, uom, slip_no } = req.body;

  const query = db.collection("inventory").doc("non-consumable").collection("items").where("mcode", "==", mcode);
  await query.get().then(async (querySnapshot) => {
    if (querySnapshot.empty) {
      const docRef = db.collection("inventory").doc("non-consumable").collection("items").doc();
      await docRef.set({ mcode, mname, mdescription, date, uom, total_received: (quantity_acpt.length) ? quantity_acpt : quantity_aprv, opening_stock: "0", current_stock: (quantity_acpt.length) ? quantity_acpt : quantity_aprv });
    } else {
      querySnapshot.forEach(async (doc) => {
        const current_stock = parseInt(doc.data().current_stock);

        let data = doc.data();

        data.current_stock = "" + (current_stock + parseInt((quantity_acpt.length) ? quantity_acpt : quantity_aprv));
        await db.collection("inventory").doc("non-consumable").collection("items").doc(doc.id).delete();
        await db.collection("inventory").doc("non-consumable").collection("items").doc(doc.id).set(data);

      });
    }

    let query = db.collection("admin").doc("request").collection("items").where("slip_no", "==", slip_no);
    await query.get().then(querySnapshot => querySnapshot.forEach(async doc => {
      await db.collection("admin").doc("request").collection("items").doc(doc.id).delete();
    }));

    query = db.collection("admin").doc("issue").collection("non-consumable").where("slip_no", "==", slip_no);
    await query.get().then(querySnapshot => querySnapshot.forEach(async doc => {
      await db.collection("admin").doc("issue").collection("non-consumable").doc(doc.id).delete();
    }));

    const docRef = db.collection("admin").doc("issue").collection("accept").doc();
    await docRef.set({ mcode, quantity_req, quantity_aprv, quantity_acpt, mname, mdescription, date, uom, slip_no, category: "non-consumable" });

    res.status(201).json({ "message": "Accept successful" });
  });
};

module.exports = { requisition, getMaterial, getIssuedMaterial, getAcceptedMaterial, editMaterial, editIssuedMaterial, issueConsumableMaterial, issueNonConsumableMaterial, checkIsAccepted, acceptConsumableMaterial, acceptNonConsumableMaterial };
