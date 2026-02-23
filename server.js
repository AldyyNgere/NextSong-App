const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const songRoutes = require("./routes/songs");
app.use("/api/songs", songRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
