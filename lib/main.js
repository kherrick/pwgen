(function() {

  //read the version of the software from package.json
  var fs = require('fs');
  var app = JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8'));

  //use commander.js to assist in argument parsing
  var program = require('commander');
  program
    .version(app.version)
    .usage('[ options ] [ pw_length ]')
    .option('-c, --capitalize',
      'Include a capital letter in the password')
    .option('-n, --numeral',
      'Include a number in the password');
  program.parse(process.argv);

  var pwgen_module = require('./pwgen_module.js');
  var password = new pwgen_module();

  //apply command line options
  if (program.capitalize) {
    password.includeCapitalLetter = true;
  }

  if (program.numeral) {
    password.includeNumber = true;
  }

  if (program.args[0]) {
    password.maxLength = parseInt(program.args[0]);
  } else {
    password.maxLength = 8;
  }

  if (program.args[1] && typeof program.args[1] != 'object') {
    program.amount = parseInt(program.args[1]);
  } else {
    program.amount = 160;
  }

  //forcing a length of at least three for all passwords, since the current pwgen_module
  //fails with the number option and a length of two or less
  try {
    if (password.maxLength < 3 || isNaN(password.maxLength)) throw "Minimum password length is three characters."
  } catch (err) {
    console.log(err);
    program.help();
  }

  //default pwgen behavior, 20 rows of 8 columns with 8 char passes in each cell
  for (var i = 0; i < 20; i++) {
    var results = '';
    for (var j = 0; j < 8; j++) {
      var pw = password.generate();
      results += (pw + ' ');
    }
    console.log(results);
  }

}).call(this);
