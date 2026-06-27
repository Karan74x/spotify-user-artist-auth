const { mongo } = require("mongoose");
const musicModel = require("../models/music.model");
const uploadFile = require("../services/storageService");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");

//music create feature for artist
async function createMusic(req, res) {
  const { title } = req.body;
  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"));

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
  });

  res.status(201).json({
    message: "Music created successfully",
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist,
    },
  });
}

//an album feature for artist
async function createAlbum(req, res) {
  const { title, musics } = req.body;

  const album = await albumModel.create({
    title,
    artist: req.user.id,
    musics: musics,
  });

  res.status(201).json({
    message: "Album created successfully",
    album: {
      id: album._id,
      title: album.title,
      artist: album.artist,
      musics: album.musics,
    },
  });
}

//get all musics
async function getAllMusics(req, res) {
  const musics = await musicModel.find().populate("artist", "username email");

  res.status(200).json({
    message: "Music fetched successfully",
    music: musics,
  });
}

//get all albums
async function getAllAlbums(req, res) {
  const albums = await albumModel
    .find()
    .populate("musics")
    .populate("artist", "username email");

  res.status(200).json({
    message: "Albums fetched successfully",
    albums: albums,
  });
}

//get album by id
async function getAlbumById(req, res) {
  const album = await albumModel
    .findById(req.params.albumId)
    .populate("musics")
    .populate("artist", "username email");

  res.status(200).json({
    message: "Album fetched successfully",
    album: album,
  });
}
module.exports = {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbums,
  getAlbumById,
};
