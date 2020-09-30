const path = require('path')

module.exports = {
    root: path.resolve(__dirname, '../'),
    outputPath: path.resolve(__dirname, '../', 'build'),
    entryPath: path.resolve(__dirname, '../', 'src/index.js'),
    templatePath: path.resolve(__dirname, '../', 'src/template.html'),
    sharedComponents: path.resolve(
        __dirname,
        '../',
        'src/common/core/index.js'
    ),
    imagesFolder: 'images',
    fontsFolder: 'fonts',
    cssFolder: 'css',
    jsFolder: 'js',
}
