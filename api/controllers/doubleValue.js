const doubleValue = (req, res, next) => {
  var doubledValue = 2 * req.body.value;
  return res.send(doubledValue.toString());
}

module.exports = {doubleValue};