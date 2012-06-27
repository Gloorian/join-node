var fs = require('fs'),
	compressor = require('node-minify'),
	content = '',
	start = 2;
	folder = process.argv[start],
	type = process.argv[start + 1] ? process.argv[start + 1] : 'js',
	min = false,
	extension = type === '*' ? '' : '.' + type,
	suffix = '';

if(process.argv.length <= 2) {
	throw new Error('You must at least specify a folder name !');
}

if(process.argv[start + 2] === 'minify') {
	min = true;
	suffix = '.min';
}

if(folder[folder.length - 1] !== '/') {
	folder += '/';
}

var exist_module = fs.hasOwnProperty('exists') ? fs : require('path');
exist_module.exists(process.cwd() + '/' + folder, function(exists) {
	if(exists) {
		fs.readdir(process.cwd() + '/' + folder, function(err, files) {
			if(err) { throw err; }
			console.log('Go into ' + folder);
			if(files.length) {
				files.forEach(function(file) {
					if(type === '*' || file.substr(file.lastIndexOf('.') + 1, file.length - 1) === type) {
						console.log('Add content of the file: ' + file);
						content += fs.readFileSync(process.cwd() + '/' + folder + file, 'utf-8');
					}
				});
				var name = folder.substr(0, folder.length - 2) + '_joined' + suffix + extension;
				exist_module.exists(process.cwd() + '/' + name, function(exists) {
					if(exists) {
						throw new Error('A file has already been created !');
					} else {
						fs.writeFile(process.cwd() + '/' + name, content, 'utf-8', function(err) {
							if(err) { throw err; }
							if(min) {
								console.log('minifying...');
								new compressor.minify({
									type: 'yui-' + type,
									fileIn: process.cwd() + '/' + name,
									fileOut: process.cwd() + '/' + name,
									callback: function(err) {
										if(err) { throw err; }
										console.log('File written: ' + name);
									}
								});
							} else {
								console.log('File written: ' + name);
							}
						});
					}
				});
			} else {
				console.log('Empty folder !');
			}
		});
	} else {
		throw new Error('The folder does not exist !');
	}
});
