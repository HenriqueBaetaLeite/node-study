const nodeMailer = require("nodemailer");

const mailTranport = nodeMailer.createTransport({
  auth: {
    user: credentials.sendGrid.user,
    pass: credentials.sendGrid.password,
  },
});

const sendEmail = async () => {
  try {
    const result = await mailTranport.sendMail({
      from: "MeadowLark Travel <info@md.com>",
      to: "joecostumer@gmail.com",
      subject: "Tour",
      text: "Thank you for booking you trip with us!",
    });
    console.log("Mail sent successfully!");
    return result;
  } catch (error) {
    console.log("Some erro ocurried: ", error);
  }
};

module.exports = sendEmail;