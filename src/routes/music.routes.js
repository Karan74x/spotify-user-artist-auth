const express = require("express");
const musicController = require("../controllers/musicController.js");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});
const authMiddleware = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.post(
  "/upload",
  authMiddleware.authArtist,
  upload.single("music"),
  musicController.createMusic,
);

router.post("/album", authMiddleware.authArtist, musicController.createAlbum);

router.get("/", musicController.getAllMusics);
module.exports = router;
