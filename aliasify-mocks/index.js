var lodash = require('lodash');
var searchForMocks = require('./src/search-for-mocks');

module.exports = function (config) {
    var directories = config['directories'];
    var mocks = config['aliases'] || {};
    var mockFilePattern = config['mockFilePattern'] || '-mock.js';
    var modulesToMock = config['modules'];

    if (directories && lodash.isArray(directories )) {
        lodash.forEach(directories, searchForMocks.bind(this, false, '', mocks, mockFilePattern));
    }

    if (lodash.isString(modulesToMock)) {
        lodash.forEach([modulesToMock], searchForMocks.bind(this, true, '', mocks, mockFilePattern));
    } else if (lodash.isArray(modulesToMock)) {
        lodash.forEach(modulesToMock, searchForMocks.bind(this, true, '', mocks, mockFilePattern));
    } else if (lodash.isObject(modulesToMock)) {
        lodash.extend(mocks, modulesToMock);
    }
};