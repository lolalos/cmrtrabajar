// Importa las dependencias necesarias
import nodemailer from "nodemailer";
import sequelize from "sequelize";
import database from "../../database";
import Setting from "../../models/Setting";
import { config } from "dotenv";

// Carga las variables de entorno desde el archivo .env
config();

// Define la interfaz para los datos del usuario
interface UserData {
  companyId: number;
}

// Función principal para enviar el correo de recuperación de contraseña
const SendMail = async (email: string, tokenSenha: string) => {
  // Busca el usuario por email en la base de datos
  const { hasResult, data } = await filterEmail(email);

  // Si no encuentra el usuario, retorna un error 404
  if (!hasResult) {
    return { status: 404, message: "Correo electrónico no encontrado" };
  }

  // Extrae los datos del usuario
  const userData = data[0][0] as UserData;

  // Si no encuentra los datos del usuario o el companyId, retorna error
  if (!userData || userData.companyId === undefined) {
    return { status: 404, message: "Datos del usuario no encontrados" };
  }

  // Obtiene el companyId del usuario
  const companyId = userData.companyId;

  // Obtiene las variables de entorno para la configuración del SMTP
  const urlSmtp = process.env.MAIL_HOST;
  const userSmtp = process.env.MAIL_USER;
  const passwordSmpt = process.env.MAIL_PASS;
  const fromEmail = process.env.MAIL_FROM;

  // Crea el transporter de nodemailer para enviar el correo
  const transporter = nodemailer.createTransport({
    host: urlSmtp,
    port: Number(process.env.MAIL_PORT),
    secure: true,
    auth: { user: userSmtp, pass: passwordSmpt }
  });

  // Si el usuario existe, procede a insertar el token y enviar el correo
  if (hasResult === true) {
    // Inserta el token de recuperación en la base de datos
    const { hasResults, datas } = await insertToken(email, tokenSenha);

    // Función interna para enviar el correo electrónico
    async function sendEmail() {
      try {
        // Define las opciones del correo, incluyendo el HTML del mensaje
        const mailOptions = {
          from: fromEmail,
          to: email,
          subject: "Restablecimiento de Contraseña CRM X TRAVEL Peru",
          html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Restablecimiento de Contraseña</title>
  <style>
    body {
      font-family: 'Roboto', Arial, Helvetica, sans-serif;
      background: #f8f9fd;
      margin: 0;
      padding: 0;
      color: #212121;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      padding: 32px 24px;
    }
    .header {
      text-align: center;
      padding-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
    }
    .header-title {
      font-size: 2rem;
      font-weight: bold;
      margin: 0;
      color: #071f4f;
    }
    .subtitle {
      text-align: center;
      font-size: 1.1rem;
      margin: 24px 0 0 0;
      color: #131313;
    }
    .code-section {
      background: #071f4f;
      color: #fff;
      border-radius: 8px;
      margin: 32px 0;
      padding: 32px 16px;
      text-align: center;
      background-image: linear-gradient(135deg, #071f4f 80%, #42d159 100%);
    }
    .code-title {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 12px;
    }
    .code-value {
      font-size: 2.2rem;
      font-weight: bold;
      letter-spacing: 4px;
      background: #fff;
      color: #071f4f;
      border-radius: 6px;
      padding: 12px 24px;
      display: inline-block;
      margin-top: 8px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      color: #888;
      font-size: 0.95rem;
    }
    .help-section {
      margin-top: 32px;
      text-align: center;
    }
    .help-title {
      font-size: 1.2rem;
      font-weight: bold;
      color: #212121;
      margin-bottom: 8px;
    }
    .help-text {
      color: #131313;
      font-size: 1rem;
      margin: 0;
    }
    @media (max-width: 600px) {
      .container {
        padding: 16px 4vw;
      }
      .code-section {
        padding: 24px 8px;
      }
      .code-value {
        font-size: 1.5rem;
        padding: 8px 12px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="header-title">Bienvenido al area de soporte de X Travel peru </h1>
    </div>
    <div class="subtitle">
      ¡Has solicitado la recuperación  de la contraseña de tu usuario !
    </div>
    <div class="code-section">
      <div class="code-title">Código de Verificación:</div>
      <div class="code-value">${tokenSenha}</div>
    </div>
    <div class="help-section">
      <div class="help-title">¿Tienes dudas?</div>
      <p class="help-text">si tienens complicaciones contactanos al whatsapp 925465788.</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} X- Travel Peru. Todos los derechos reservados.
    </div>
  </div>
</body>
</html>
`
        };

        // Envía el correo electrónico usando el transporter de nodemailer
        const info = await transporter.sendMail(mailOptions);
        // Imprime en consola la respuesta del envío
        console.log("Correo electrónico enviado: " + info.response);
      } catch (error) {
        // Si ocurre un error, lo muestra en consola
        console.log(error);
      }
    }
    // Llama a la función para enviar el correo
    sendEmail();
  }
};

// Función para buscar el usuario por email en la base de datos
const filterEmail = async (email: string) => {
  const sql = `SELECT * FROM "Users"  WHERE email ='${email}'`;
  const result = await database.query(sql, {
    type: sequelize.QueryTypes.SELECT
  });
  // Retorna si encontró resultados y los datos encontrados
  return { hasResult: result.length > 0, data: [result] };
};

// Función para actualizar el token de recuperación en la base de datos
const insertToken = async (email: string, tokenSenha: string) => {
  const sqls = `UPDATE "Users" SET "resetPassword"= '${tokenSenha}' WHERE email ='${email}'`;
  const results = await database.query(sqls, {
    type: sequelize.QueryTypes.UPDATE
  });
  // Retorna si la actualización fue exitosa y los datos de la operación
  return { hasResults: results.length > 0, datas: results };
};

// Exporta la función principal para ser utilizada en otros módulos
export default SendMail;
