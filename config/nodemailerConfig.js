const nodemailer = require("nodemailer");

const user = "xsmilefitness@gmail.com";
const pass = "xSmile1234";

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});


module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: "Por favor, confirma tu cuenta de correo.",
    html: `<h1>Correo de Activación de cuenta</h1>
        <h2>Hola ${name}</h2>
        <p>Gracias por registrarte en xSmileFitness.  
        Por favor, confirma tu email haciendo click en el siguiente enlace.</p>
        <a href=http://localhost:3005/user/confirm/${confirmationCode}> Activar cuenta.</a>
        </div>`,
  }).catch(err => console.log(err));
};