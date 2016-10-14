const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const Image = require('../models/Image');
const upload = multer({storage: multer.memoryStorage()});



const router = express.Router();

router.get('/', (req, res)=>{
  Image.find({} , (err, images) =>{
    res.status(err ? 400:200).send(err||images);
  })
})

router.post('/', upload.single('image'), (req, res) =>{
  Image.upload(req.file, (err, image) =>{
    res.status(err ? 400: 200).send(err || image);
  });
});

router.route('/:id')
  .get((req, res) =>{
    Image.findById(req.params.id, (err, image)=>{
      if(err || !image){
        return res.status(400).send(err || 'Image not found');
      }
      res.send(image);
    })
  })
  .delete((req, res) => {
    Image.findByIdAndRemove(req.params.id, (err, image) => {
      if(err || !image){
        return res.status(400).send(err|| 'Image not found');
      }
      Image.deleteImage(image.Key, (err, result) => {
        Image.find({}, (err, images) => {
          res.status(err? 400 : 200).send(err || images);
        })
      });
    })
  })

module.exports = router;
