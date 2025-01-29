require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Permite recibir datos en formato JSON

// Configurar transporte SMTP (usando Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Tu correo
    pass: process.env.EMAIL_PASS, // Contraseña de aplicación de Gmail
  },
});

// Ruta para recibir datos del formulario y enviar el correo
app.post("/send-email", async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  const mailOptions = {
    from: email,
    to: "gastondangelo12@gmail.com", // Tu correo donde recibirás los mensajes
    subject: `Nuevo mensaje de ${nombre}`,
    text: `De: ${nombre}\nCorreo: ${email}\n\nMensaje:\n${mensaje}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado correctamente");
    res.status(200).send("Correo enviado correctamente");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).send("Error al enviar el correo");
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
