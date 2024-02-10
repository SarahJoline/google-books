const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGODB_URI;
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log(err));

const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
