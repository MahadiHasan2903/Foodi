const emailSender = require("./emailSender");
const path = require("path");
const ejs = require("ejs");

// Helper function to send activation email
const sendActivationEmail = async (user, activationToken) => {
  const data = {
    user: { name: user.name },
    activationCode: activationToken.activationCode,
  };
  const html = await ejs.renderFile(
    path.join(__dirname, "../mails/activation-mail.ejs"),
    data
  );

  await emailSender({
    email: user.email,
    subject: "Activate your account",
    template: "activation-mail.ejs",
    data,
  });
};

module.exports = sendActivationEmail;
