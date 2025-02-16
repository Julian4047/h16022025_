const express = require("express");
const mysql = require("mysql2");

const router = express.Router();

const db = mysql.createConnection({
    host: "sql10.freesqldatabase.com",
    user: "sql10763072",
    password: "uKYVTNPmwA",
    database: "sql10763072",
    port: 3306
});

db.connect(err => {
    if (err) {
        console.error("Error conectando a MySQL:", err);
        return;
    }
    console.log("Conectado a MySQL");
});

router.post("/loguserlogin", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.query(sql, [name, email], (err, result) => {
        if (err) {
            console.error("Error insertando usuario:", err);
            return res.status(500).json({ error: "Error en el servidor" });
        }
        res.json({ success: true, userId: result.insertId });
    });
});

module.exports = router;
