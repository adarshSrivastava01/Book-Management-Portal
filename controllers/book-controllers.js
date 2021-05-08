const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Book = require("../models/book");
const User = require("../models/user");

const showAllBooks = async (req, res, next) => {
  let BOOKS = [];

  Book.find({}, (err, books) => {
    if (err) {
      const error = new HttpError("Something went wrong! Try again later", 442);
      return next(error);
    }
    books.map((book) => BOOKS.push(book));
    res.status(201).json({ books: BOOKS });
  });
};

const getBookById = async (req, res, next) => {
  let book;
  let bookId = req.params.bid;

  try {
    book = await Book.findById(bookId);
  } catch (err) {
    const error = new HttpError(
      "Invalid inputs passed, please try again later.",
      422
    );
    return next(error);
  }

  if (!book) {
    const error = new HttpError(
      "Invalid inputs passed, please try again later.",
      422
    );
    return next(error);
  }

  res.json({ book: book });
};

exports.showAllBooks = showAllBooks;
exports.getBookById = getBookById;
