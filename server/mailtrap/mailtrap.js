const { MailtrapClient } = require("mailtrap");
const dotenv = require("dotenv");

dotenv.config();
const TOKEN = process.env.MAILTRAP_TOKEN;

const mailTrapClient = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

module.exports = { mailTrapClient, sender };