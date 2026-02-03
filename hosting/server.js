const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.static("public"));

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "riteshpatidar.test@gmail.com",
        pass: "pfytewklzzamwlma"
    }
});

// SMTP verification
transporter.verify((error, success) => {
    if (error) {
        console.error(" SMTP VERIFY FAILED");
        console.error(error);
    } else {
        console.log(" SMTP SERVER IS READY");
    }
});

app.get("/send-mail", async (req, res) => {

    try {
        const link = "http://localhost:3000/valentine.html";
        console.log("🔗 Valentine link created:", link);

        const mailOptions = {
            from: `"Secret Valentine 💌" <ritesh.patidar.test@gmail.com>`,
            to: "rit9171122814@gmail.com",
            subject: "I have something to ask you ❤️",
            html: `
                <h2>Hey 👀</h2>
                <p>I have a small question for you...</p>
                <a href="${link}" style="font-size:18px;color:red;">
                    💘 Click Here 💘
                </a>
            `
        };


        const info = await transporter.sendMail(mailOptions);


        res.send("Mail sent successfully!");

    } catch (error) {
        console.error("MAIL SENDING FAILED");
        console.error("Error message:", error.message);
        console.error("Full error:", error);

        res.status(500).send("Mail sending failed. Check console.");
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
