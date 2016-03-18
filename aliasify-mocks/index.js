var lodash = require('lodash');
var searchForMocks = require('./src/search-for-mocks');

module.exports = function (config) {
    var directories = config['directories'];
    var mocks = config['aliases'] || {};
    var modulesToMock = config['modules'];

    config['mockFilePattern'] = config['mockFilePattern'] || '-dummy.js';
    config['mockFolderPattern'] = config['mockFolderPattern'] || 'mocks';

    if (directories && lodash.isArray(directories )) {
        lodash.forEach(directories, searchForMocks.bind(this, false, '', mocks, config));
    }

    if (lodash.isString(modulesToMock)) {
        lodash.forEach([modulesToMock], searchForMocks.bind(this, true, '', mocks, config));
    } else if (lodash.isArray(modulesToMock)) {
        lodash.forEach(modulesToMock, searchForMocks.bind(this, true, '', mocks, config));
    } else if (lodash.isObject(modulesToMock)) {
        lodash.extend(mocks, modulesToMock);
    }
};