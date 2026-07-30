const fs = require("fs");

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads", { recursive: true });
}

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post("/submit", upload.single("resume"), (req, res) => {

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

    let resume = "";

    if (req.file) {
        resume = req.file.filename;
    }

    const sql = `
        INSERT INTO applications
        (
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
        )
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [
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
        ],
        (err, result) => {

            if (err) {
                console.log("MYSQL ERROR:", err);

                return res.status(500).json({
                    success: false,
                    message: "Database Error"
                });
            }

            res.json({
                success: true,
                message: "Application Submitted Successfully"
            });

        }
    );

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});