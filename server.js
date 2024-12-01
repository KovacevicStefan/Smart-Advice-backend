const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "https://www.smartadvicens.com",
];

var corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./app/routes/news.routes")(app);
require("./app/routes/email.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/service.routes")(app);
require("./app/routes/comments.routes")(app);

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
