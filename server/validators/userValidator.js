import Joi from "joi";

const addUserValidator = async (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(150),
    email: Joi.string()
      .email()
      .required()
      .min(4)
      .max(120),
      // .error(new Error("email is invalid!")),
    password: Joi.string().required().min(6),
    role: Joi.string().default("user"),
  });
  return schema.validate(data);
};

const updateUserValidator = async (data) => {
  const schema = Joi.object({
    password: Joi.string().required().min(6).max(150),
    newPassword: Joi.string().min(6).max(150),
    // role: Joi.string().required(),
  });

  return schema.validate(data);
};

const authUserValidator = async (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .pattern(
        new RegExp(
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        )
      )
      .required()
      .min(4)
      .max(120)
      .error(new Error("email is invalid!")),
    password: Joi.string().required().min(6),
  });

  return schema.validate(data);
};

export { addUserValidator, updateUserValidator, authUserValidator };
