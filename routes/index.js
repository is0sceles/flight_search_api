const express = require('express');

const router = express.Router();

/* redirect to /flights/search page. */
router.get('/', (req, res) => {
  res.redirect('/flights/search');
});


module.exports = router;
