var lodash = require('lodash');
var fs = require('fs');
var path = require('path');
var matches = require('validator').matches;

var searchForMocks = function (shouldUseDirectoryOnly, rootPath, mocks, pattern, directory) {
    var directories;
    var originalPath;
    var directoryPath = path.join(rootPath, directory);
    var directoryStat;

    try {
        directoryStat = fs.statSync(directoryPath);

        if (directoryStat.isFile()) {

            if (matches(directoryPath, pattern)) {
                originalPath = directory;

                if (!shouldUseDirectoryOnly) {
                    originalPath = directoryPath.replace('__mocks__/', '');
                }

                originalPath = originalPath.replace('-mock.js', '');

                mocks[originalPath] = directoryPath.replace('.js', '');
            }
        } else if (directoryStat.isDirectory()) {
            directories = fs.readdirSync(directoryPath);

            lodash.forEach(directories, searchForMocks.bind(this, shouldUseDirectoryOnly, directoryPath, mocks, pattern));
        }

    } catch (error) {}
};

module.exports = searchForMocks;