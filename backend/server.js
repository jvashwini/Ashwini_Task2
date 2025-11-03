import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authroutes.js";
import noteRoutes from "./routes/noteroutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/", authRoutes);
app.use("/notes", noteRoutes);

app.get("/", (req, res) => {
  res.send("Notes App Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
