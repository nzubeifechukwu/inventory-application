const { body } = require("express-validator");

const alphaErr = "must contain only letters.";
const nameLengthErr = "must be between 1 and 20 characters.";
const titleLengthErr = "must be between 1 and 200 characters.";

const validateBookDetails = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage(`Book title ${titleLengthErr}`),
  body("first_name")
    .trim()
    .isAlpha()
    .withMessage(`Author first name ${alphaErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`Author first name ${nameLengthErr}`),
  body("last_name")
    .trim()
    .isAlpha()
    .withMessage(`Author last name ${alphaErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`Author last name ${nameLengthErr}`),
];

module.exports = validateBookDetails;
