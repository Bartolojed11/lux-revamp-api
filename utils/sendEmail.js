const nodemailer = require("nodemailer");

const catchAsync = require("../handlers/CatchAsync");

const emailConfig = require(`${process.cwd()}/config/email`);

const sendEmail = catchAsync(async (options) => {
    // Transporter
    const transporter = nodemailer.createTransport({
        host: emailConfig.EMAIL_HOST,
        port: emailConfig.EMAIL_PORT,
        auth: {
            user: emailConfig.EMAIL_USER,
            pass: emailConfig.EMAIL_PASSWORD,
        },
    });

    // Email Options
    const mailOptions = {
        from: `${emailConfig.EMAIL_FROM} <${emailConfig.EMAIL_FROM_NAME}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    // Send email
    await transporter.sendMail(mailOptions);
});

module.exports = sendEmail;
