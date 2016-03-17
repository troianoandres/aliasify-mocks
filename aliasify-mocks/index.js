var lodash = require('lodash');
var searchForMocks = require('./src/search-for-mocks');

process.env.NODE_PATH = __dirname;

module.exports = function (config) {
    var directories = config['directories'];
    var mocks = config['aliases'];
    var mockFilePattern = config['mockFilePattern'];
    var modulesToMock = config['modules'];

    lodash.forEach(directories, searchForMocks.bind(this, false, '', mocks, mockFilePattern));

    if (lodash.isString(modulesToMock)) {
        lodash.forEach([modulesToMock], searchForMocks.bind(this, true, '', mocks, mockFilePattern));
    } else {
        lodash.extend(mocks, modulesToMock);
    }
};

aliasifyModules({
    directories: [
        'gulp-builder/src'
    ],
    modules: 'lib-test/modules-mocks',
    mockFilePattern: '-mock.js',
    aliases: aliases
});