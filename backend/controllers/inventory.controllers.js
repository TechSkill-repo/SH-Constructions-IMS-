const db = require('./db.controllers');

const postConsumableItem = async (req, res) => {
  const { mcode, mname, mdescription, date, uom, total_received, opening_stock, current_stock } = req.body;

  const docRef = db.collection("inventory").doc("consumable").collection("items").doc();
  await docRef.set({ mcode, mname, mdescription, date, uom, total_received, opening_stock, current_stock });

  res.status(201).json({ "message": "Post successful" });
}

const postNonConsumableItem = async (req, res) => {
  const { mcode, mname, mdescription, date, uom, total_received, opening_stock, current_stock } = req.body;

  const docRef = db.collection("inventory").doc("non-consumable").collection("items").doc();
  await docRef.set({ mcode, mname, mdescription, date, uom, total_received, opening_stock, current_stock });

  res.status(201).json({ "message": "Post successful" });
}

const getConsumableItem = async (req, res) => {
  const items = [];
  const query = db.collection("inventory").doc("consumable").collection("items");
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material in inventory not found" });
    } else {
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      res.status(200).json({
        message: "Materials Fetched",
        items
      });
    }
  });
};

const getNonConsumableItem = async (req, res) => {
  const items = [];
  const query = db.collection("inventory").doc("non-consumable").collection("items");
  await query.get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      res.status(404).json({ message: "Material in inventory not found" });
    } else {
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      res.status(200).json({
        message: "Materials Fetched",
        items
      });
    }
  });
};

module.exports = { postConsumableItem, getConsumableItem, postNonConsumableItem, getNonConsumableItem };