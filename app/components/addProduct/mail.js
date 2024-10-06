const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");

const app = express();
const upload = multer({ dest: "./productsPics" });

app.use(express.json());

app.post(
  "/send-email",
  upload.fields([{ name: "productImage" }, { name: "ingredientsImage" }]),
  (req, res) => {
    const { productName, productBrand, barcode } = req.body;
    const productImage = req.files.productImage[0];
    const ingredientsImage = req.files.ingredientsImage[0];

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "arphandrame0@gmail.com",
        pass: "@Naruto-123",
      },
    });

    const mailOptions = {
      from: "arphandrame0@gmail.com",
      to: "drame_c@etna-alternance.net",
      subject: "Nouveau produit à ajouter",
      text: `Produit: ${productName}\nMarque: ${productBrand}\nCode-barres: ${barcode}`,
      attachments: [
        {
          filename: productImage.originalname,
          path: path.join(__dirname, productImage.path),
        },
        {
          filename: ingredientsImage.originalname,
          path: path.join(__dirname, ingredientsImage.path),
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur lors de l'envoi de l'email:", error);
        return res.status(500).json({ success: false, error: error.message });
      }
      console.log("Email envoyé:", info.response);
      res.json({ success: true });
    });
  }
);

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://192.168.1.114:${PORT}`);
});
