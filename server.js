const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 3000;
const API_KEY = "AIzaSyDUAzHMOpnn2il9217Ge3qgPnGHRogq3qY";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

app.use(cors());
app.use(express.json());

app.post("/api/gemini", async (req, res) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "API call failed", details: err.message });
  }
});

app.listen(PORT, () => console.log(`Proxy server running at http://localhost:${PORT}`));
