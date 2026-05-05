const User = require("./userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SECRET_KEY = "novelix_secret_key";

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send("All fields required ❌");
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).send("Email already exists ❌");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.send("Account created successfully ✅");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error ❌");
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false });
    }

    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success: false });

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      token,
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};