var vExportVar = "LinkParam";
const pkg = require('./package');
var fs = require('fs');
var vHeader = "/* ---------------------------------------";
vHeader += "\n Exported Module Variable: "+vExportVar;
vHeader += "\n Package:  "+pkg.name;
vHeader += "\n Version:  "+pkg.version;
vHeader += "\n Homepage: "+pkg.homepage;
vHeader += "\n Author:   "+pkg.author;
vHeader += "\n License:  "+pkg.licence;
vHeader += "\n Require Module with:";
vHeader += "\n    const "+vExportVar+" = require('" + pkg.name+ "');";
vHeader += "\n ------------------------------------------ */\n";
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
    vLibPath+'arrayhash.js',
    vLibPath+'blob.js',
    vLibPath+'bootstrap.js',
    vLibPath+'classeditor.js',
    vLibPath+'date.js',
    vLibPath+'filesaver.js',
    vLibPath+'handlebars.js',
    vLibPath+'handlebars_helper.js',
    vLibPath+'jsoneditor.js',
    vLibPath+'linkparam.js',
    vLibPath+'localstorage.js',
    './src/npm_tail.js'
  ], vLibOut, function(err) {
    if (err) throw err
    console.log('done');
  });
