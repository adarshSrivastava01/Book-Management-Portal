const express = require("express");
const { check } = require("express-validator");

const bookControllers = require("../controllers/book-controllers");

const router = express.Router();

router.get("/", bookControllers.showAllBooks);

router.get("/:bid", bookControllers.getBookById);

module.exports = router;
