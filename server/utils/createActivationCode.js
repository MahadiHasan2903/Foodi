const jwt = require("jsonwebtoken");

const createActivationToken = (user) => {
  const activationCode = (
    100000 + Math.floor(Math.random() * 900000)
  ).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET_KEY,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};

module.exports = createActivationToken;
