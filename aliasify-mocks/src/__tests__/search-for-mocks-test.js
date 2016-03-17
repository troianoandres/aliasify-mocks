describe('When searchForMocks method is called', function () {
    var searchForMocks = spy(require('../search-for-mocks'));
    var fs = require('fs');
    var path = require('path');
    var statMock = {
        isFile: stub(),
        isDirectory: stub()
    };
    var result;

    beforeEach(function () {
        searchForMocks.reset();
        fs.statSync.reset();
        fs.readdirSync.reset();
        statMock.isDirectory.reset();
        statMock.isFile.reset();
    });

    describe('always', function () {

        it('should call path.join to generate the current directoryPath', function () {
            result = searchForMocks(false, __dirname, {}, '*-mocks', 'mocks-directory');

            expect(path.join)
                .to.have.callCount(1)
                .to.have.been.calledWith(__dirname, 'mocks-directory');
        });

        it('should call fs.statSync to get the directory status information related to directoryPath', function () {
            result = searchForMocks(false, __dirname, {}, '*-mocks', 'mocks-directory');

            expect(fs.statSync)
                .to.have.callCount(1)
                .to.have.been.calledWith(path.join(__dirname, 'mocks-directory'));
        });
    });

    describe('with shouldUseDirectoryOnly', function () {

    });

    describe('without shouldUseDirectoryOnly', function () {

    });
});