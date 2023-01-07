const db = require('./db.controllers');

const fetchDetails = async (req, res) => {
  const mcode = req.query.mcode;

  const query = db.collection("materials").doc("data").collection("items").where("mcode", "==", mcode);
  await query.get().then(async (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      res.status(200).json({
        message: "Material fetched",
        item: data
      });
    });
  });
}

const addMaterial = async (req, res) => {
  const { mcode, mname, mdescription, uom, category, price } = req.body;

  const docRef = db.collection("materials").doc("data").collection("items").doc();
  await docRef.set({ mcode, mname, mdescription, uom, category, price });

  res.status(201).json({ "message": "Material details created" });
};

const editMaterial = async (req, res) => {
  const { mcode, mname, mdescription, uom, category, price } = req.body;

  const query = db.collection("materials").doc("data").collection("items").where("mcode", "==", mcode);
  await query.get().then(querySnapshot => {
    if (querySnapshot.empty) {
      res.status(404).json({ "message": "Material not found" });
    } else {
      querySnapshot.forEach(async doc => {
        await db.collection("materials").doc("data").collection("items").doc(doc.id).delete();
        await db.collection("materials").doc("data").collection("items").doc(doc.id).set({ mcode, mname, mdescription, uom, category, price });
      });
      res.status(200).json({ "message": "Material details Edited" });
    }
  });
};

const getMaterials = async (req, res) => {
  const items = [];

  const query = db.collection("materials").doc("data").collection("items");
  await query.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
  });

  res.status(200).json({ message: "materials fetched", items: items });
};

const getMcodes = async (req, res) => {
  const items = [];

  let query = db.collection("materials").doc("data").collection("items");
  await query.get().then((querySnapshot) => {
    querySnapshot.forEach(doc => {
      items.push(doc.data().mcode);
    });
  });

  res.status(200).json({ "message": "codes fetched", codes: items });
}

const getRequests = async (req, res) => {
  const query = db.collection("materials").doc("request").collection("items");
  const items = []
  const temp = {};
  const data = [];

  await query.get().then(querySnapshot => {
    if (querySnapshot.empty) {
      res.status(404).json({ "message": "Requests not found" });
    } else {
      querySnapshot.forEach(doc => {
        items.push(doc.data());
      });

      items.forEach(item => {
        if (temp[item.mcode]) {
          temp[item.mcode]["quantity_req"] += parseInt(item.quantity_req);
          temp[item.mcode]["quantity_aprv"] += parseInt(item.quantity_aprv);
        } else {
          item.quantity_req = parseInt(item.quantity_req);
          item.quantity_aprv = parseInt(item.quantity_aprv);
          temp[item.mcode] = item;
        }
      });

      Object.entries(temp).forEach(item => {
        data.push(item[1]);
      });

      res.status(200).json({ "message": "Requests found", "data": data });
    }
  });
}

const getConsumableTotalPrice = async (req, res) => {
  const storeId = req.query.storeId;
  const items = [];
  const materials = [];
  const prices = [];

  const matQuery = db.collection("materials").doc("data").collection("items");
  await matQuery.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const { mcode, price } = doc.data();
      materials.push({ mcode, price });
    });
  });

  const invQuery = db.collection("stores").doc(storeId).collection("items");
  await invQuery.get().then(querySnapshot => {
    if (querySnapshot.empty) {
      res.status(404).json({ "message": "Materials not found" });
    } else {
      querySnapshot.forEach(doc => {
        if (doc.data().category === "consumable") {
          const { mcode, mquantity } = doc.data();
          items.push({ mcode, mquantity });
        }
      });

      items.forEach(item => {
        materials.forEach(material => {
          if (material.mcode === item.mcode) {
            prices.push(parseInt(item.mquantity) * parseInt(material.price));
          }
        })
      });

      let total;
      try {
        total = prices.reduce((prev, curr) => prev + curr);
      } catch {
        total = 0;
      }

      res.status(200).json({ "message": "Total price fetched", "total": total });
    }
  });
}

const getNonConsumableTotalPrice = async (req, res) => {
  const storeId = req.query.storeId;
  const items = [];
  const materials = [];
  const prices = [];

  const matQuery = db.collection("materials").doc("data").collection("items");
  await matQuery.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const { mcode, price } = doc.data();
      materials.push({ mcode, price });
    });
  });

  const invQuery = db.collection("stores").doc(storeId).collection("items");
  await invQuery.get().then(querySnapshot => {
    if (querySnapshot.empty) {
      res.status(404).json({ "message": "Materials not found" });
    } else {
      querySnapshot.forEach(doc => {
        if (doc.data().category === "non-consumable") {
          const { mcode, mquantity } = doc.data();
          items.push({ mcode, mquantity });
        }
      });

      items.forEach(item => {
        materials.forEach(material => {
          if (material.mcode === item.mcode) {
            prices.push(parseInt(item.mquantity) * parseInt(material.price));
          }
        })
      });

      let total;
      try {
        total = prices.reduce((prev, curr) => prev + curr);
      } catch {
        total = 0;
      }

      res.status(200).json({ "message": "Total price fetched", "total": total });
    }
  });
}

// debug only: material add feature for SITE STORE consumable and non-consumable inventory
const addSiteConsumable = (req, res) => {
  const { mcode, date, mname, mdescription, uom, mquantity, storeId } = req.body;

  let query = db.collection("stores").doc(storeId).collection("items").where("mcode", "==", mcode);
  query.get().then(async querySnapshot => {
    if (querySnapshot.empty) {
      const docRef2 = db.collection("stores").doc(storeId).collection("items").doc();
      await docRef2.set({ storeId, mcode, date, mname, mdescription, uom, mquantity, category: "consumable" });
    } else {
      querySnapshot.forEach(async doc => {
        const data = doc.data();
        data.mquantity = "" + (parseInt(data.mquantity) + parseInt(mquantity));
        await db.collection("stores").doc(storeId).collection("items").doc(doc.id).delete();
        await db.collection("stores").doc(storeId).collection("items").doc(doc.id).set(data);
      })
    }

    res.status(201).json({ "message": "Material Added" });
  });
};

const addSiteNonConsumable = (req, res) => {
  const { mcode, date, mname, mdescription, uom, mquantity, storeId } = req.body;

  let query = db.collection("stores").doc(storeId).collection("items").where("mcode", "==", mcode);
  query.get().then(async querySnapshot => {
    if (querySnapshot.empty) {
      const docRef2 = db.collection("stores").doc(storeId).collection("items").doc();
      await docRef2.set({ storeId, mcode, date, mname, mdescription, uom, mquantity, category: "non-consumable" });
    } else {
      querySnapshot.forEach(async doc => {
        const data = doc.data();
        data.mquantity = "" + (parseInt(data.mquantity) + parseInt(mquantity));
        await db.collection("stores").doc(storeId).collection("items").doc(doc.id).delete();
        await db.collection("stores").doc(storeId).collection("items").doc(doc.id).set(data);
      })
    }

    res.status(201).json({ "message": "Material Added" });
  });
};

module.exports = { fetchDetails, getMcodes, getRequests, getMaterials, addMaterial, editMaterial, getConsumableTotalPrice, getNonConsumableTotalPrice, addSiteConsumable, addSiteNonConsumable };
