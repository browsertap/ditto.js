var connect = require("./connect");

module.exports = function (ditto) {
  return {
    connect: connect(ditto)
  }
}