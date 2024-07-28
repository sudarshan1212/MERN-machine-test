const mongoose = require("mongoose");

const chalkPromise = import("chalk");
const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.CONNECTION);
    const name = process.env.CONNECTION.split("/")[3].toUpperCase();

    chalkPromise
      .then((module) => {
        const chalk = module.default;
        const chocolate = chalk.hex("#c66b27");
        const almond = chalk.hex("#efdecd");
        console.log(
          chocolate(
            chalk.bold("CONNECTION:"),
            almond(chalk.bold("MONGO ATLAS CONNECTED SUCCESSFULLY :", name))
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    console.log("not connected");
  }
};
module.exports = dbConnection;
