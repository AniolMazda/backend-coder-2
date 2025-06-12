import { transport } from "./email.helper.js";

const resetPasswordEmail = async(email) => {
    try {
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f8f8f8; margin: 0; padding: 20px;">
            <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <h1 style="color: #4a4a4a; font-size: 24px; margin-bottom: 20px;">Haz clic en el siguiente enlace para recuperar tu contraseña:</h1>
                <a href="http://localhost:8080/resetPassword/${email}"
                style="display: inline-block; background-color: #6c757d; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin-top: 20px; font-weight: bold; text-align: center;">
                Recuperar Contraseña
                </a>
                <p style="margin-top: 15px;">El Link estara habilitado durante 1 hora</p>
                <p style="margin-top: 15px;">Si no solicitaste este código, por favor ignora este correo.</p>
            </div>
            <div class="footer" style="margin-top: 30px; font-size: 12px; color: #888888; text-align: center;">
                <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
            </div>
            </div>
        `;
        await transport.sendMail({
            from:process.env.GOOGLE_EMAIL,
            to:email,
            subject:"Recuperar tu Contraseña",
            html:htmlContent
        })
    } catch (error) {
        throw error
    }
}

export default resetPasswordEmail