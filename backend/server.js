// backend/server.js
const express = require("express");
const app = express();

// Render يفرض متغير PORT
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Route رئيسي للتجربة
app.get("/", (req, res) => {
  res.json({ message: "✅ Backend is running successfully 🚀" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
