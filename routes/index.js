const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('KwaMhlanga Eats API is live!');
});

module.exports = router;
