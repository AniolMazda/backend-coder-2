import { transport } from "./email.helper.js";

const verifyEmail = async(email,verifyCode) => {
    try {
        const htmlContent = `
            <html>
            <head>
                <style>
                    body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333333; /* Gris oscuro para el texto principal */
                    background-color: #f8f8f8; /* Gris muy claro para el fondo */
                    margin: 0;
                    padding: 20px;
                    }
                    .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff; /* Blanco puro para el contenedor del contenido */
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra sutil gris */
                    }
                    h1 {
                    color: #4a4a4a; /* Gris medio oscuro para el título */
                    font-size: 24px;
                    margin-bottom: 20px;
                    }
                    p {
                    margin-bottom: 15px;
                    }
                    a {
                    display: inline-block;
                    background-color: #6c757d; /* Gris azulado para el botón */
                    color: white;
                    padding: 12px 25px;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 20px;
                    font-weight: bold;
                    text-align: center;
                    }
                    a:hover {
                    background-color: #5a6268; /* Gris azulado más oscuro al pasar el ratón */
                    }
                    .footer {
                    margin-top: 30px;
                    font-size: 12px;
                    color: #888888; /* Gris claro para el pie de página */
                    text-align: center;
                    }
                </style>
            </head>
            <body>
            <div class="container">
                <h1>Código de verificación de cuenta: <strong style="color: #4a4a4a;">${verifyCode}</strong></h1>
                <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
                <a href="http://localhost:8080/verify/${email}">Verificar Cuenta</a>
                <p>Si no solicitaste este código, por favor ignora este correo.</p>
            </div>
            <div class="footer">
                <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
            </div>
            </body>
            </html>
        `;
        await transport.sendMail({
            from:process.env.GOOGLE_EMAIL,
            to:email,
            subject:"Verifica tu Cuenta",
            html:htmlContent
        })
    } catch (error) {
        throw error
    }
}

export default verifyEmail