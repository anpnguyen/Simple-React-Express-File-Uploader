require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload());


app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  console.log()
  const file = req.files.image;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
// as


app.listen(process.env.PORT, () => console.log("Server Started..."));
