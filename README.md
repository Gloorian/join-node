node-join
==============

**node-join** is an npm module to join multiple files and even minify them (option only available for javascript and css files).

Installation
------------

Use `npm` package manager as root (or use sudo word) so that you can install it globally
	
	npm install -g node-join

Usage
-----

Use join commande. Here is the way to use it:

	join folder [type=js] [minify]

Options surronded with [] are optionnal, "js" is the default type but must be specified when "minify" option is used. Type must be the extension of the files: "js" instead of "javascript" but you can use "*" value to say to join all files. In that case, minify is impossible. A file is created in the current directory with this name:
	
	folderName_joined[.min].extension

"folderName" is here the name of the folder, ".min" is only specified when the script minifies. "extension" is the extension of the file, '.js' for javascript files, but when "type" is "*", the file does not have extension.