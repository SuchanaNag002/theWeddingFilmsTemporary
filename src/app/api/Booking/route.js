import { transporter,mailOptions } from "@/EmailManager/nodemailer";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
        const {name,email,date,details} = await request.json();
        console.log(name,email,date,details);
        await transporter.sendMail({
            ...mailOptions,
            subject : "New Booking Enquiry From " + name,
            text: " This is A test",
            html: generateHtmlContent(name,email,date,details)
        })
        return NextResponse.json({success:true})
    } catch (err) {
        console.log(err);
        return NextResponse.json({success:false})
    }
   
}

function generateHtmlContent(name, email, date, details) {
    return (
        `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Enquiry</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
      overflow: hidden;
    }
    header {
      background-color: #008080;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    h1 {
      color: #fff;
    }
    p {
      margin: 10px 0;
    }
    footer {
      background-color: #f4f4f4;
      padding: 20px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>New Booking Enquiry</h1>
    </header>
    <div style="padding: 20px;">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Contact Email:</strong> ${email}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Details:<br></strong> ${details}</p>
    </div>
    <footer>
      <p>Thank you for choosing our services!</p>
    </footer>
  </div>
</body>
</html>

`
    )
}

