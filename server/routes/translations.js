const express = require('express');
const router = express.Router();

const Translation = require('../models/Translation');

router.post('/', (req, res) => {
  Translation.create(req.body, (err, translation) =>{
    res.status(err ? 400 : 200).send(err || translation);
  });
});

router.get('/', (req, res) => {
  Translation.find({}, (err, translations) =>{
    res.status(err ? 400 : 200).send(err || translations);
  });
});

module.exports = router;
