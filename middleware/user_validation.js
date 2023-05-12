// eslint-disable-next-line consistent-return
const validateUserSchema = (schema) => async (req, res, next) => {
  try {
    const value = await schema.validateAsync({ ...req.body, ...req.query, ...req.params });

    res.locals.data = value;

    req.decoded = value;

    next();
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = validateUserSchema;
