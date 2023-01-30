const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const app = express();
const config = require("./app/config/auth.config");
var logger = require("morgan");
app.use(fileUpload({ useTempFiles: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
var corsOptions = {
  origin: [`${config.frontendDomain}`, `${config.frontendDomain2}`],
};
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: false,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "Jod Backend" });
});
const db = require("./app/models");
//Commentez ce code pour ne pas renitiiliser la base de donnée à chaque lancement du serveur
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
});
//
require("./app/routes/user.auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/loan.routes")(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
