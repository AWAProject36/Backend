const express = require('express');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
    folder: 'restImages',
    allowedFormats: ['jpg', 'png']
    }
  });
  
var parser = multer({ storage: storage });

router.post('/', parser.single('image'),
    function (request, response) {
        console.log(request.file);
        response.json(request.file);
    });

module.exports = router;