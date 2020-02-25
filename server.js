const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("connected to mongoDB"))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiRoutes = require("./routes/apiRoutes");
app.use("/", apiRoutes);

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
