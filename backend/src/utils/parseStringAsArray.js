module.exports = function parseStringAsArray(arrayAsString) {
  return arrayAsString.split(',').map(data => data.trim());
};
