(function() {

	//use commander.js for argument assistance
	var program = require('commander');

	//read the version of the software from package.json
	fs = require('fs');
	json = JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8'));

	program.version(json.version)
		/*
		.usage('[options] [length]')
		.option('-c, --capitalize',
			'Include at least one capital letter in the password')
		*/
		.parse(process.argv);

		//for more argument processing		
		//console.log(process.argv)
		//console.log(program.capitalize);
		
		
	var pwgen_module = require('./pwgen_module.js');
	var password = new pwgen_module();
	
	password.maxLength = 8;
	password.includeCapitalLetter = false;
	password.includeNumber = true;

	//default pwgen behavior, 20 rows of 8 columns with 8 char passes in each cell.
	for (var i = 0; i < 20; i++) {
		var results = '';
		for (var j = 0; j < 8; j++) {
			var pw = password.generate();			
			results += (pw + ' ');
		}
		console.log(results);
	}	

}).call(this);
