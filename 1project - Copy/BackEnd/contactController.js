const Contact = require("./contactModel");

exports.sendContact = async (req, res) => {
  try {
    console.log("DATA RECEIVED:", req.body);

    const newContact = new Contact(req.body);
    await newContact.save();

    res.status(200).json({ message: "Saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving data" });
  }
};