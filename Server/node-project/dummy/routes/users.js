var express = require('express');
var router = express.Router();

var users = require('../controllers/usercontroller');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* POST /users */
router.post('/', users.post);

/* GET /users */
router.get('/', users.get);

/* PUT /users --> body: { name_id, club_id, faktor} */
router.put('/', users.visit);

module.exports = router;
