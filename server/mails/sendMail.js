const fs = require('fs');
const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports.sendMail = async (user) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        }
    });
    let template = fs.readFileSync(__dirname + `/templates/${user.template}Mail.html`, 'utf8');
    template = template.replaceAll('{{ username }}', user.username);
    template = template.replace('{{ email }}', user.email);
    template = template.replace('{{ date }}', new Date().toString());

    let subject;
    if (user.template === 'welcome') {
        template = template.replace('{{ link }}', process.env.SERVER + `/api/auth/verified?token=${user.token}`);
        subject = "🎟️ Welcome to SwifTicket — Your Gateway to Events!";
    }

    else if (user.template === 'forgotPassword') {
        template = template.replace('{{ link }}', process.env.CLIENT + `/reset-password?token=${user.token}`);
        subject = "SwifTicket Password Reset Request – Action Required";
    }

    return await transporter.sendMail({
        from: process.env.EMAIL,
        to: user.email,
        subject: subject,
        html: template,
    }).catch(err => {
        return err.responseCode;
    });
}