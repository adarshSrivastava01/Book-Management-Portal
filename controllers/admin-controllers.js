const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Admin = require("../models/admin");
const Book = require("../models/book");

const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  console.log(email, password);

  let existingUser;

  try {
    existingUser = await Admin.findOne({ email: email });
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

  if (existingUser.password !== password) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    admin:true
  });
};

const addBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs passed, please try again later.",
      422
    );
    return next(error);
  }

  const { title, author, year, copiesAvailable, publicationName } = req.body;
  const userId = req.params.id;
  let user;
  try {
    user = await Admin.findById(userId);
  } catch (err) {
    const error = new HttpError("Something went wrong! Try again later.", 401);
    return next(error);
  }

  if(!user) {
    const error = new HttpError("Something went wrong! Try again later.", 401);
    return next(error);
  }

  const createdBook = new Book({
    title,
    author,
    year,
    copiesAvailable,
    publicationName,
    image: "https://picsum.photos/200",
  });

  try {
    await createdBook.save();
  } catch (err) {
    const error = new HttpError("Creating Book failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ book: createdBook });
};

const updateBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const bookId = req.params.bid;
  const { title, author, copiesAvailable, year, publicationName } = req.body;

  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update link info.",
      500
    );
    return next(error);
  }

  if(!book) {
    const error = new HttpError(
      "Something went wrong, could not update link info.",
      500
    );
    return next(error);
  }

  book.title = title;
  book.author = author;
  book.copiesAvailable = copiesAvailable;
  book.year = year;
  book.publicationName = publicationName;

  try {
    await book.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update book.",
      500
    );
    return next(error);
  }

  res.status(200).json({ book: book.toObject({ getters: true }) });
};

const deleteBook = async (req, res, next) => {
  const bookId = req.params.bid;

  let book;
  try {
    book = await Book.findById(bookId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete link.",
      500
    );
    return next(error);
  }

  if (!book) {
    const error = new HttpError("Could not find link for this id.", 404);
    return next(error);
  }

  try {
    await book.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete link.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted Book." });
};

exports.adminLogin = adminLogin;
exports.addBook = addBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
