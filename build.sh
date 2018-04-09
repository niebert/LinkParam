#!/bin/sh
echo "(1) DIST: cp src/linkparam.js dist/linkparam.js"
cp src/linkparam.js dist/linkparam.js
echo "(2) DOCS: cp src/linkparam.js docs/linkparam.js"
cp src/linkparam.js docs/linkparam.js
echo "(3) build DONE"
npm run compress
echo "(4) compress DONE"
