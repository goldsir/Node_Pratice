const path = require('path');
let externals = _externals();

function _externals() {
    let manifest = require('./package.json');
    let dependencies = manifest.dependencies;
    let externals = {};
    for (let p in dependencies) {
        externals[p] = 'commonjs ' + p;
    }
    return externals;
}

module.exports = {
    mode: 'production'
    , entry: {
        app: './app.js',
    },
    target: 'node',
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: '[name].js'
    },
}