const Joi = require("joi");

function UserValidator(user, type) {
  let schema;
  if (type === "signup") {
    schema = Joi.object({
      username: Joi.string().max(30).required(),
      email: Joi.string().max(55).required(),
      password: Joi.string().max(255).required(),
    });
  } else if (type === "login") {
    schema = Joi.object({
      email: Joi.string().max(55).required(),
      password: Joi.string().max(255).required(),
    });
  }
  return schema.validate(user);
}

module.exports = UserValidator;
