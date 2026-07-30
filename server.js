const fs = require("fs");

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads", { recursive: true });
}

 const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "zaalimainternships.in@gmail.com",
        pass: "zazr qkuv xbqc vlxh"
    }
});
  //----------------------------------------->
  const express = require("express");
  const cors = require("cors");
  const multer = require("multer");
  const path = require("path");

  const db = require("./db");

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));

  app.use(express.static("public"));

  const storage = multer.diskStorage({

      destination:function(req,file,cb){
          cb(null,"uploads/");
      },

      filename:function(req,file,cb){
          cb(null,Date.now()+"-"+file.originalname);
      }

  });

  const upload = multer({storage:storage});

  app.post("/submit",upload.single("resume"),(req,res)=>{

      const {

          email,
          fullname,
          gender,
          qualification,
          program,
          duration,
          phone,
          whatsapp,
          college,
          country,
          skill,
          portfolio,
          job,
          source

      } = req.body;

      let resume="";

      if(req.file){
          resume=req.file.filename;
      }

      const sql=`
      INSERT INTO applications
      (email,fullname,gender,qualification,program,duration,
      phone,whatsapp,college,country,skill,portfolio,job,source,resume)

      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
      `;

      db.query(sql,[

          email,
          fullname,
          gender,
          qualification,
          program,
          duration,
          phone,
          whatsapp,
          college,
          country,
          skill,
          portfolio,
          job,
          source,
          resume

      ],(err,result)=>{

          if(err){
              console.log("MYSQL ERROR:", err);
              return res.status(500).json({
                  success:false,
                  message:"Database Error"
              });
          }

          /*res.json({
              success:true,
              message:"Application Submitted Successfully"
          });*/

          res.json({
        success: true,
        message: "Application Submitted Successfully"
    });
transporter.sendMail({
    from: '"Zaalima Internships" <zaalimainternships.in@gmail.com>',
    to: ["zaalimainternships.in@gmail.com","deneydasari886@gmail.com"],
    replyTo: "zaalimainternships.in@gmail.com",
    subject: "Your Internship Application Has Been Received",

    text: `
Hello ${fullname},

Thank you for applying for the ${program} Program.

We have successfully received your application.

Our recruitment team will review your application carefully. If you are shortlisted, you will receive the next steps via email.

Application Details
----------------------------
Name: ${fullname}
Email: ${email}
Internship Program: ${program}
Duration: ${duration}

Thank you for choosing Zaalima Internships.

Regards,
Zaalima Internships
Email: zaalimainternships.in@gmail.com
`,

    html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:30px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">

<tr>
<td style="background:#673ab7;color:#ffffff;padding:20px;text-align:center;">
<h1 style="margin:0;">Zaalima Internships</h1>
<p style="margin-top:8px;">Application Confirmation</p>
</td>
</tr>

<tr>
<td style="padding:30px;color:#333333;">

<h2>Hello ${fullname},</h2>

<p>
Thank you for applying for the <strong>${program}</strong> Internship Program.
</p>

<p>
Your application has been successfully received.
</p>

<p>
Our recruitment team will carefully review your application.
If your profile matches our requirements, we will contact you through this email.
</p>

<table width="100%" cellpadding="8" style="border-collapse:collapse;margin-top:25px;">
<tr style="background:#f5f5f5;">
<td><strong>Name</strong></td>
<td>${fullname}</td>
</tr>

<tr>
<td><strong>Email</strong></td>
<td>${email}</td>
</tr>

<tr style="background:#f5f5f5;">
<td><strong>Internship</strong></td>
<td>${program}</td>
</tr>

<tr>
<td><strong>Duration</strong></td>
<td>${duration}</td>
</tr>

</table>

<p style="margin-top:30px;">
Thank you for your interest in Zaalima Internships.
We wish you the very best.
</p>

<p>
Regards,<br>
<strong>Zaalima Internships</strong><br>
zaalimainternships.in@gmail.com
</p>

</td>
</tr>

<tr>
<td style="background:#f5f5f5;padding:15px;text-align:center;font-size:12px;color:#666;">
This is an automated confirmation email. Please do not reply directly to this message.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`
}, (mailErr, info) => {

    if (mailErr) {
        console.log(mailErr);
    } else {
        console.log(info.response);
    }

    

});


          

      });

  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});