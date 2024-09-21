import express from "express";
import mongoose from "mongoose";
import router from "./router/notesRoutes"
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use("/", express.static(path.join(__dirname, "/src/views")));

app.use("/",router);

const MONGOURL = "mongodb://127.0.0.1:27017";

mongoose
  .connect(MONGOURL, {
    dbName: "crud-using-ts",
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("mongoos connetion error", err);
  });

app.listen(4000, () => {
  console.log(`server running on http://localhost:4000`);
});
