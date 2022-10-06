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

  res.status(201).json({ "message": "Material detail created" });
}

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
  const items = [];
  const materials = [];
  const prices = [];

  const matQuery = db.collection("materials").doc("data").collection("items");
  matQuery.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const { mcode, price } = doc.data();
      materials.push({ mcode, price });
    });
  });

  const invQuery = db.collection("inventory").doc("consumable").collection("items");
  invQuery.get().then(querySnapshot => {
    if (querySnapshot.empty) {
      res.status(404).json({ "message": "Materials not found" });
    } else {
      querySnapshot.forEach(doc => {
        const { mcode, current_stock } = doc.data();
        items.push({ mcode, current_stock });
      });

      items.forEach(item => {
        materials.forEach(material => {
          if (material.mcode === item.mcode) {
            prices.push(parseInt(item.current_stock) * parseInt(material.price));
          }
        })
      });

      const total = prices.reduce((prev, curr) => prev + curr);

      res.status(200).json({ "message": "Total price fetched", "total": total });
    }
  });
}

const getNonConsumableTotalPrice = async (req, res) => {
  const items = [];
  const materials = [];
  const prices = [];

  const matQuery = db.collection("materials").doc("data").collection("items");
  matQuery.get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
      const { mcode, price } = doc.data();
      materials.push({ mcode, price });
    });
  });

  const invQuery = db.collection("inventory").doc("non-consumable").collection("items");
  invQuery.get().then(querySnapshot => {
    if (querySnapshot.empty) {
      res.status(404).json({ "message": "Materials not found" });
    } else {
      querySnapshot.forEach(doc => {
        const { mcode, current_stock } = doc.data();
        items.push({ mcode, current_stock });
      });

      items.forEach(item => {
        materials.forEach(material => {
          if (material.mcode === item.mcode) {
            prices.push(parseInt(item.current_stock) * parseInt(material.price));
          }
        })
      });

      const total = prices.reduce((prev, curr) => prev + curr);

      res.status(200).json({ "message": "Total price fetched", "total": total });
    }
  });
}

module.exports = { fetchDetails, getMcodes, getRequests, getMaterials, addMaterial, getConsumableTotalPrice, getNonConsumableTotalPrice };
