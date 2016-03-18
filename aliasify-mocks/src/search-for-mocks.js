var lodash = require('lodash');
var fs = require('fs');
var path = require('path');
var matches = require('validator').matches;

var searchForMocks = function (shouldUseDirectoryOnly, rootPath, mocks, config, directory) {
    var directories;
    var originalPath;
    var directoryPath = path.join(rootPath, directory);
    var directoryStat;

    try {
        directoryStat = fs.statSync(directoryPath);

        if (directoryStat.isFile()) {

            if (matches(directoryPath, config['mockFilePattern'])) {
                originalPath = directory;

                if (!shouldUseDirectoryOnly) {
                    originalPath = directoryPath.replace(config['mockFolderPattern'] + '/', '');
                }

                originalPath = originalPath.replace(config['mockFilePattern'], '');

                mocks[originalPath] = directoryPath.replace('.js', '');
            }
        } else if (directoryStat.isDirectory()) {
            directories = fs.readdirSync(directoryPath);

            lodash.forEach(directories, searchForMocks.bind(this, shouldUseDirectoryOnly, directoryPath, mocks, config));
        }

    } catch (error) {}
};

module.exports = searchForMocks;