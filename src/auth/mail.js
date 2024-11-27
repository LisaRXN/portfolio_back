require("dotenv").config();
const Mailjet = require("node-mailjet");

function sendMail(req, res) {

  const { firstname, lastname, email, text } = req.body;

  if (!email || !text) {
    return res.status(400).json({ status: "Please fill in all fields." });
  }


  const mailjet = Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  );

  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "lisa.eriksen@epitech.eu",
          Name: `${lastname}, ${firstname} `,
        },
        To: [
          {
            Email: "lisa.eriksen@epitech.eu",
            Name: "Lisa Eriksen",
          },
        ],
        Subject: "Contact from Portfolio!",
        TextPart: text,
        HTMLPart: 
        `<p>${text}</p><br>
        <p>Email : ${email}</p>
        <p>Firstname : ${firstname}</p>
        <p>Lastname : ${lastname}</p>
        `
      },
    ],
  });

  request
    .then((result) => {
      console.log("Email sent:", result.body);
      res
        .status(200)
        .json({ message: "Email sent successfully!", details: result.body });
    })
    .catch((err) => {
      console.error("Error sending email:", err.statusCode, err.message);
      res
        .status(err.statusCode || 500)
        .json({ error: "Failed to send email.", details: err.message });
    });
}

module.exports = { sendMail };
