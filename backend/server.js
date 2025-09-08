// backend/server.js
const express = require("express");
const app = express();

// Render يوفر PORT في المتغيرات البيئية
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Backend is running successfully 🚀" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
