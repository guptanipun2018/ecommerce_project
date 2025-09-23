const express= require("express");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/user");


const app =express();
app.use(express.json());

const cors = require("cors");
app.use(cors());



mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("MongoDB is connected"))
.catch(err => console.error("MongoDB connection error:", err));



// Add to cart
app.post("/api/cart/add", async (req, res) => {
  try {
    const { email, product } = req.body; // frontend se email & product bhej

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // check agar product already cart me hai
    const existing = user.cart.find(item => item.productId === product.productId);

    if (existing) {
      existing.quantity += 1; // quantity badha de
    } else {
      user.cart.push(product); // naya product push kar
    }

    await user.save();
    res.json({ message: "Product added to cart", cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Get cart
app.get("/api/cart/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.use(express.static(path.join(__dirname, "../client/build")));  
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});   

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});