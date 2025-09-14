import express from "express";
import cors from "cors";
import { gamesData } from "./gamesData.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// ✅ New static route for games
app.get("/games", (req, res) => {
  res.json(gamesData);
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
