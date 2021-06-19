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
    subject: "xSmile Fitness - Por favor, confirma tu cuenta de correo.",
    html: `<h1>Correo de Activación de cuenta</h1>
        <h2>Hola ${name}</h2>
        <p>Gracias por registrarte en xSmileFitness.  
        Por favor, confirma tu email haciendo click en el siguiente enlace.</p>
        <a href=http://localhost:3005/user/confirm/${confirmationCode}> Activar cuenta.</a>
        </div>`,
  }).catch(err => console.log(err));
};

module.exports.sendConfirmationEmailNewClass = (name, email, confirmationCode) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: "xSmile Fitness - Confirmación clase reservada.",
    html: `<h1>Confirmacion clase reservada</h1>
        <h2>Hola ${name}</h2>
        <p>Te confirmamos la reserva de la clase de ${room.name} para el ${room.dateStart}, 
        te esperamos!.</p>
       
        </div>`,
  }).catch(err => console.log(err));
};

module.exports.sendReviewClass = (name, email, confirmationCode) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: "xSmile Fitness - Cuentanos tus impresiones.",
    html: `<h1>Queremos saber que te pareció la clase de hoy</h1>
        <h2>Hola ${name}</h2>
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSf4Mkq0_Zs7Y2aKbpEABvEDBRyY0v1YEzuCNdoC2pqpyWVLIg/viewform?embedded=true" width="640" height="1286" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
        <p>Te confirmamos la reserva de la clase de ${room.name} para el ${room.dateStart}, 
        te esperamos!.</p>
       
        </div>`,
  }).catch(err => console.log(err));
};