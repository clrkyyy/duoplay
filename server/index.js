import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(morgan("tiny"));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
});
app.use(limiter);

let cache = { data: null, timestamp: 0 };
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// 👇 THIS IS THE ROUTE YOUR FRONTEND CALLS
app.get("/games", async (req, res) => {
  try {
    const now = Date.now();

    if (cache.data && now - cache.timestamp < CACHE_DURATION) {
      console.log("Serving from cache 🗃️");
      return res.json(cache.data);
    }

    const response = await fetch("https://www.freetogame.com/api/games");
    if (!response.ok) throw new Error("Upstream API failed");

    const data = await response.json();
    cache = { data, timestamp: now };

    console.log("Fetched from API 🌍");
    res.json(data);
  } catch (err) {
    console.error("Error fetching games:", err);
    res.status(500).json({ error: "Failed to fetch games" });
  }
});

// Health check (important for Render)
app.get("/", (req, res) => {
  res.send("✅ DuoPlay API is running");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
