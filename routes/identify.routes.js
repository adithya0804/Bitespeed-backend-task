const express = require("express");
const router = express.Router();
const {identifyContact}=require("../controller/contacts.controller")
const identifyMiddleware=require("../middlewares/identify.middleware");
router.post("/", identifyMiddleware, identifyContact)

module.exports=router