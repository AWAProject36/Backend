const express = require('express');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const router = express.Router();

var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: '',
    allowedFormats: ['jpg', 'png'],
  });
  
var parser = multer({ storage: storage });

router.post('/', parser.single('image'),
    function (request, response) {
        console.log(req.file);
        res.status(201);
        res.json(req.file);
    });

module.exports = router;