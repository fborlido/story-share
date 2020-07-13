const { Strategy } = require("passport")

const enterlines = (str) => {
  console.log(str);
  newstr = str.replace("\n", "</p><br><p>");
  console.log(str);
  return newstr;
}

module.exports = enterlines;