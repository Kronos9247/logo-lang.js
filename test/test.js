const logo = require('logo-lang')
var compiler = new logo.Compiler('./logo');

const lsystem = {
  angle: 90,
  scala: 1.4,
  axoim: 'X',
  rules: {
    X: '-YF+XFX+FY-',
    Y: '+XF-YFY-FX+'
  }
};

var output = compiler.compile([[lsystem, 5]]);

const fs = require('fs');
fs.writeFile("output.logo", output[0], function(err) {
  if(err) {
    return console.log(err);
  }

  console.log("The file was saved!");
});
