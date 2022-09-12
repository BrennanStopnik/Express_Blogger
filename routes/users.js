var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/all', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/single', (req, res) => {
  res.json()({
    success: true,
    user: "Single User"
  })
})

module.exports = router;
