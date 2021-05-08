const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/user-controllers");

const router = express.Router();

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  usersControllers.signup
);

router.post("/login", usersControllers.login);

router.patch("/issuebook/:bid", usersControllers.issueBook);

module.exports = router;
