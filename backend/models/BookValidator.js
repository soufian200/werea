const Joi = require("joi");

function BookValidator(book) {
  const schema = Joi.object({
    title: Joi.string().max(200).required(),
    cover: Joi.string().required().messages({
      "string.base": `Upload cover for this book`,
      "any.required": `Upload cover for this book`,
    }),
    pdfPath: Joi.string().required().messages({
      "string.base": `Upload pdf file for this book`,
      "any.required": `Upload pdf file for this book`,
    }),
    size: Joi.number().required(),
    rate: Joi.string().max(3).required(),
    author: Joi.string().required(),
    pages: Joi.string().required(),
    year: Joi.string().required(),
    language: Joi.string().required(),
    category: Joi.string().required(),
    type: Joi.string().required(),
    description: Joi.string().required(),
  });
  return schema.validate(book);
}

module.exports = BookValidator;
