var express = require('express');
var router = express.Router();

var clubs = require('../controllers/clubcontroller');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* POST /clubs */
router.post('/', clubs.post);

/* GET /clubs */
router.get('/', clubs.get);

module.exports = router;
