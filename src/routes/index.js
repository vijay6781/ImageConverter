const express = require("express");
const config = require("../../config/env");
const docsRoute = require("./docs.route");
const defaultRoute = require("./default.route");
const planRoute = require("./plan.route");

const router = express.Router();

const defaultRoutes = [
  { path: "/", route: defaultRoute },
  { path: "/plan", route: planRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

const devRoutes = [
  // routes available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
];
/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
