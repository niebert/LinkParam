var vExportVar = "LinkParam";
const pkg = require('./package');
var fs = require('fs');
var vHeader = "/* ---------------------------------------";
vHeader += "\n Exported Module Variable: "+vExportVar;
vHeader += "\n Package:  "+pkg.name;
vHeader += "\n Version:  "+pkg.version;
vHeader += "\n Homepage: "+pkg.homepage;
vHeader += "\n Author:   "+pkg.author;
vHeader += "\n License:  "+pkg.license;
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
console.log("Create Library '"+vLibOut+"'");
  concat([
    './src/npm_header.js',
    vLibPath+'linkparam.js',
    //'./src/npm_tail.js'
  ], vLibOut, function(err) {
    if (err) throw err
    console.log('File: "'+vLibOut+'" created!');
  });
