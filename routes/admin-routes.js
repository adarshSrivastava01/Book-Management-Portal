const express = require("express");
const { check } = require("express-validator");

const adminControllers = require("../controllers/admin-controllers");
const userControllers = require("../controllers/user-controllers");

const router = express.Router();

router.post(
  "/adminlogin",
  [check("email").not().isEmpty(), check("password").isLength({ min: 8 })],
  adminControllers.adminLogin
);

router.post(
  "/addbook/:id",
  [
    check("title").not().isEmpty(),
    check("author").isLength({ min: 5 }),
    check("year").isNumeric(),
    check("copiesAvailable").isNumeric(),
    check("publicationName").isLength({min: 5}),
  ],
  adminControllers.addBook
);

router.patch(
  "/:bid",
  [
    check("title").not().isEmpty(),
    check("author").not().isEmpty(),
    check("copiesAvailable").not().isEmpty(),
    check("year").not().isEmpty(),
    check("publicationName").isLength({min: 5})
  ],
  adminControllers.updateBook
);

router.delete("/:bid", adminControllers.deleteBook);

module.exports = router;
