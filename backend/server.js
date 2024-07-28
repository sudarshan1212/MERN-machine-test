const express = require("express");
const chalkPromise = import("chalk");
require("dotenv").config();

const app = express();
const cors = require("cors");
const dbConnection = require("./database/dbConnection");
const userRoutes = require("./Routes/userRoutes");
const employeeRoutes = require("./Routes/employeeRoutes");

app.use(cors());
const port = process.env.PORT || 5001;
app.use(express.json());
dbConnection();
app.use("/api/users", userRoutes);
app.use("/api/employee", employeeRoutes);

chalkPromise
  .then((module) => {
    const chalk = module.default;
    const aquaBlue = chalk.hex("#00FFFF");

    app.listen(port, () =>
      console.log(
        aquaBlue(
          `THE SERVER IS RUNNING ON: ${chalk.hex("#FFC0CB").bold(port)} !`
        )
      )
    );
  })
  .catch((error) => {
    console.error("Error loading chalk:", error);
  });
