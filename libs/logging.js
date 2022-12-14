const morgan = require("morgan");

const fs = require("fs");
const app = require("../meadowlark");

switch (app.get("env")) {
  case "development":
    app.use(morgan("dev"));
    break;
  case "production":
    const stream = fs.createWriteStream(__dirname + "/access.log", {
      flags: "a",
    });
    app.use(morgan("combined", { stream }));
    break;
}
