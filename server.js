const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiRoutes = require("./routes/apiRoutes");
app.use("/", apiRoutes);

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
