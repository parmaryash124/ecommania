const nodemailer = require("nodemailer");

async function mailSender(email, forgotToken, res, next) {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      // host: 'smtppro.zoho.in',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "yashagile124@gmail.com",
        pass: "kmuqxqwpjghownbs",
      },
    });
    try {
      let result = transporter.sendMail(
        {
          from: "yashagile124@gmail.com", // sender address
          to: email, // list of receivers
          subject: "Forgot Password", // Subject line
          text: `test`, // plain text body,
          html: `<h4>"test link": ${forgotToken} </h4>`, // html body
        },
        function (error, info) {
          if (error) {
            return next(error);
          } else {
            resolve();
            // console.log(info, "info .....");
          }
        }
      );
    } catch (error) {
      return next(error);
    }
  });
}

module.exports = mailSender;
