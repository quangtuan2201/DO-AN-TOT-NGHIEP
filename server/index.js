const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors({ origin: true }));

const buildDir = path.join(__dirname, "../public");
console.log("Using files in " + buildDir);

const subDir = "/";
const logRequests = false;

if (subDir === "/") {
  console.log(
    "The server config assuming it is serving at the server root. You can control this with the `subDir` variable in index.js."
  );
} else {
  console.log("The server config assuming it is serving at '" + subDir + "'.");
}

if (logRequests) {
  console.log(
    "The server will log all incoming request. It's not recommended for production use."
  );
}
//

// Serve the static files from the React app
app.use(subDir, express.static(buildDir));
// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  if (logRequests) {
    console.log(req.method + " " + req.url);
  }
  res.sendFile(path.join(buildDir, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log("React.JS App is running on the port " + port);

// const express = require("express");
// const path = require("path");
// const cors = require("cors");
// const https = require("https");
// const fs = require("fs");
// console.log("start server !");
// const app = express();
// app.use(cors({ origin: true }));

// const buildDir = path.join(__dirname, "../build");
// console.log("Using files in " + buildDir);

// const subDir = "/";
// const logRequests = false;

// if (subDir === "/") {
//   console.log(
//     "The server config assuming it is serving at the server root. You can control this with the `subDir` variable in index.js."
//   );
// } else {
//   console.log("The server config assuming it is serving at '" + subDir + "'.");
// }

// if (logRequests) {
//   console.log(
//     "The server will log all incoming request. It's not recommended for production use."
//   );
// }

// const options = {
//   key: fs.readFileSync("key.pem"),
//   cert: fs.readFileSync("cert.pem"),
// };
// console.log("options : ", options);

// // Serve the static files from the React app
// app.use(subDir, express.static(buildDir));

// // Handles any requests that don't match the ones above
// app.get("*", (req, res) => {
//   if (logRequests) {
//     console.log(req.method + " " + req.url);
//   }
//   res.sendFile(path.join(buildDir, "index.html"));
// });

// const port = 2201;
// //  process.env.PORT || 3000;

// // Create an HTTPS server with the express app
// https.createServer(options, app).listen(port);

// console.log("React.JS App is running on the port " + port);
