const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ee7a98756ab6c7",
      pass: "6f43453f4c6dee",
    },
  });

  const mailOptions = {
    from: '"Rahul 👻" <maddison53@ethereal.email>',
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

 const mailResponse =  await transporter.sendMail(mailOptions);
 return mailResponse
};

module.exports = sendMail;
