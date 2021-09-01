var express = require('express');
var router = express.Router();

const { check, body, validationResult } = require('express-validator');

const doubleValueController = require('../controllers/doubleValue');


function convertToNumMiddleware(req, res, next) {
  var numberValue = Number(req.body.value);
  next();
}

function validationMiddleware(req, res, next){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {   
    res.status(422).send({ errors: errors.array(), message: 'Invalid input. Must contain only numbers' });
 } else {
   next();
 }
}

/* GET home page. */
router.get('/', function(req, res) {
  res.send('0');
});

//POST
router.post('/', [check('value').isNumeric().withMessage('Invalid input. Must contain only numbers.'),], validationMiddleware, convertToNumMiddleware, doubleValueController.doubleValue);

module.exports = router;

