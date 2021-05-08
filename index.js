const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const usersRoutes = require("./routes/user-routes");
const adminRoutes = require("./routes/admin-routes");
const booksRoutes = require("./routes/book-routes");
const HttpError = require("./models/http-error");
const { urlencoded } = require("body-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Acces-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use(cors());

app.use("/api/users", usersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/books", booksRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rwvj2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to Database");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
