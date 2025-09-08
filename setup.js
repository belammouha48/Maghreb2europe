const fs = require("fs");
const path = require("path");

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
  console.log("✅ Created:", filePath);
}

// Backend files
writeFile("backend/.env.example", `PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/maghreb2europe
NODE_ENV=production
`);

writeFile("backend/server.js", `const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Maghreb2Europe Backend Running...");
});

app.listen(PORT, () => console.log("Server started on port", PORT));
`);

writeFile("backend/render.yaml", `services:
  - type: web
    name: maghreb2europe-backend
    env: node
    plan: free
    buildCommand: "npm install"
    startCommand: "node server.js"
`);

// Frontend files
writeFile("frontend/.env.example", `VITE_API_URL=https://maghreb2europe-backend.onrender.com/api`);

writeFile("frontend/index.html", `<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Maghreb2Europe</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>`);

writeFile("frontend/src/main.jsx", `import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return <h1>مرحبا بك في Maghreb2Europe 🌍</h1>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
`);

writeFile("frontend/vercel.json", `{
  "version": 2,
  "builds": [
    { "src": "package.json", "use": "@vercel/node" }
  ]
}`);

// Deploy instructions
writeFile("deploy.md", `# خطوات النشر 🚀

## Backend (Render)
1. أنشئ حساب على [Render](https://render.com)
2. أنشئ Web Service جديد
3. اربط مستودع GitHub فيه مجلد backend
4. أضف المتغيرات من backend/.env.example

## Frontend (Vercel)
1. أنشئ حساب على [Vercel](https://vercel.com)
2. اربط مستودع GitHub فيه مجلد frontend
3. أضف المتغير VITE_API_URL مثل في frontend/.env.example
`);

