const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const HttpError = require("../models/http-error");
const User = require("../models/user");
const Book = require("../models/book");

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs passed, please try again later.",
      422
    );
    return next(error);
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      422
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({
      userId: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      admin: false,
    });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    admin: false,
  });
};

const issueBook = async (req, res, next) => {
  let book;
  const bookId = req.params.bid; // User ID will need to be sent to keep track of who issued the book
  console.log(bookId);
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    const error = new HttpError(
      "Invalid inputs passed, please try again later.",
      422
    );
    return next(error);
  }
  console.log(book);

  if (!book) {
    const error = new HttpError(
      "Invalid inputs passed, please try again later.",
      422
    );
    return next(error);
  }

  if (book.copiesAvailable <= 0) {
    const error = new HttpError(
      "Invalid inputs passed, please try again later.",
      422
    );
    return next(error);
  }

  book.copiesAvailable = book.copiesAvailable - 1;

  try {
    await book.save();
  } catch (err) {
    const error = new HttpError(
      "Invalid inputs passed, please try again later.",
      422
    );
    return next(error);
  }

  res.json({ book: book });
};

exports.signup = signup;
exports.login = login;
exports.issueBook = issueBook;
