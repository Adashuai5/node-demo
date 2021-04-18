import { RequestHandler } from "express";
const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
} as RequestHandler);
router.get("/xxx", function(req, res, next) {
  res.send("xxx respond with a resource");
} as RequestHandler);

module.exports = router;
