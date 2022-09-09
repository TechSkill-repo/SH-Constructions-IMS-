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

module.exports = { getMaterials };
