#!/bin/sh
echo "cp src/linkparam.js dist/linkparam.js"
cp src/linkparam.js dist/linkparam.js
echo "(1) build DONE"
npm run compress
echo "(2) compress DONE"
