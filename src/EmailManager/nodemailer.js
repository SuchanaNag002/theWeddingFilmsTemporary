import nodemailer from 'nodemailer';
const email=process.env.APP_EMAIL
const password=process.env.APP_PASSWORD

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth : {
        user: email,
        pass: password
    },
});

export const mailOptions = {
    from: email,
    to : email
}
console.log(email,password);
