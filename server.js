const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";
//const routes = require("./routes/apiRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("connected to mongoDB"))
  .catch(err => console.log(err));

const apiRoutes = require("./routes/apiRoutes");
app.use("/", apiRoutes);

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
