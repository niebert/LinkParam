var vExportVar = "LinkParam";
const pkg = require('./package');
var fs = require('fs');


function outTime(pNr) {
	var vOut = pNr;
	if (pNr == 0) {
		vOut = "00"
	} if (pNr<10) {
		vOut = "0"+pNr;
	};
	return vOut
};


function getDateTime() {
	var vNow = new Date();
	var vSep = "/"; // set separator for date
	var vOut = vNow.getFullYear() + vSep +outTime(vNow.getMonth()+1) + vSep + outTime(vNow.getDate());
  vOut += " "; // Separator between Date and Time
	vSep = ":"; // set separator for time
	vOut += vNow.getHours() + vSep + outTime(vNow.getMinutes()) + vSep + outTime(vNow.getSeconds());
	return vOut;
};

var vHeader = "/* ---------------------------------------";
vHeader += "\n Exported Module Variable: "+vExportVar;
vHeader += "\n Package:  "+pkg.name;
vHeader += "\n Version:  "+pkg.version;
vHeader += "\n Homepage: "+pkg.homepage;
vHeader += "\n Author:   "+pkg.author;
vHeader += "\n License:  "+pkg.license;
vHeader += "\n Date:     "+getDateTime();
vHeader += "\n Require Module with:";
vHeader += "\n    const "+vExportVar+" = require('" + pkg.name+ "');";
vHeader += "\n ------------------------------------------ */";
vHeader += "\n";
vHeader += "\n//--- JSHint Settings: -----";
vHeader += "\n/*jshint  laxcomma: true, asi: true, maxerr: 150 */";
vHeader += "\n/*global alert, confirm, console, prompt */";
vHeader += "\n";
fs.writeFile("./src/npm_header.js", vHeader, function(err) {
    if(err) {
        return console.log(err);
    };
    console.log("Module Header file 'src/npm_header.js' was saved!");
});
var vTail = "\n";
vTail += "\n// -------NPM Export Variable: " +vExportVar+ "---------------";
// vTail += "\nmodule.exports = {\n    \""+vExportVar+"\":"+vExportVar+"\n};";
vTail += "\nmodule.exports = "+vExportVar+";";
fs.writeFile("./src/npm_tail.js", vTail, function(err) {
    if(err) {
        return console.log(err);
    };
    console.log("Module Header file 'src/npm_tail.js' was saved!");
});
var concat = require('concat-files');
var vLibPath = './src/';
var vLibOut = './dist/'+pkg.name+'.js';
var vLibDocs = './docs/js/'+pkg.name+'.js';
console.log("Create Library '"+vLibOut+"'");
  concat([
    './src/npm_header.js',
    vLibPath + pkg.name + '.js',
    //'./src/npm_tail.js'
  ], vLibOut, function(err) {
    if (err) throw err
    console.log('File: "'+vLibOut+'" created!');
  });
console.log("Create Library '"+vLibDocs+"'");
  concat([
    './src/npm_header.js',
    vLibPath + pkg.name + '.js',
    //'./src/npm_tail.js'
  ], vLibDocs, function(err) {
      if (err) throw err
      console.log('File: "'+vLibDocs+'" created!');
  });
console.log("Create NPM main Library '" + pkg.main + "'");
  concat([
    './src/npm_header.js',
    vLibPath + pkg.name + '.js',
    './src/npm_tail.js'
  ], pkg.main, function(err) {
    if (err) throw err
    console.log('File: "'+ pkg.main + '" created!');
  });
