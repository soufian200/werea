const Joi = require("joi");

function CategoryValidator(c) {
  const schema = Joi.object({
    category: Joi.string().required(),
  });
  return schema.validate(c);
}

module.exports = CategoryValidator;
