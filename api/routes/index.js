var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator');

const doubleValueController = require('../controllers/doubleValue');

//middleware function to send error message
function validationMiddleware(req, res, next){
  const errors = validationResult(req);
  const err = "Sorry, " + req.body.value + "!";
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array(), value: err});
 } else {
   next();
 }
}

//middleware function to round req to 2 decimal places
function roundNumMiddleware(req, res, next) {
  const num = parseFloat(req.body.value).toFixed(2);
  res.send(num);
  next();
}

/* GET home page. */
router.get('/', function(req, res) {
  res.send('0');
});

//POST
router.post('/', [check('value').isNumeric().withMessage('Invalid input. Must contain only numbers.'),], validationMiddleware, roundNumMiddleware, doubleValueController.doubleValue);

module.exports = router;

