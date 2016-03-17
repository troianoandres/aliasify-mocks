describe('When searchForMocks method is called', function () {
    var fs = require('fs');
    var matches = require('validator').matches;
    var mocks;
    var path = require('path');
    var result;
    var searchForMocks = spy(require('../search-for-mocks'));
    var statMock = {
        isFile: stub(),
        isDirectory: stub()
    };

    beforeEach(function () {
        searchForMocks.reset();
        fs.statSync.reset();
        fs.readdirSync.reset();
        statMock.isDirectory.reset();
        statMock.isFile.reset();
        matches.reset();
        mocks = {};
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

    describe('with a file directoryPath', function () {

        beforeEach(function () {
            statMock.isFile.returns(true);
            statMock.isDirectory.returns(false);

            fs.statSync.returns(statMock);
        });

        describe('a matching pattern', function () {

            beforeEach(function () {
                matches.returns(true);
            });

            it('not shouldUseDirectoryOnly should add the mock pair to the mocks object', function () {
                searchForMocks(false, '', mocks, '*-mocks', '__mocks__/test-mock.js');

                expect(mocks).to.deep.equal({
                    test: '__mocks__/test-mock'
                });
            });

            it('not shouldUseDirectoryOnly should add the mock pair to the mocks object', function () {
                searchForMocks(true, '', mocks, '*-mocks', 'test-mock.js');

                expect(mocks).to.deep.equal({
                    test: 'test-mock'
                });
            });
        });

        describe('a non matching pattern', function () {

            beforeEach(function () {
                matches.returns(false);
            });

            it('shouldUseDirectoryOnly should not add any mock to the mocks object', function () {
                searchForMocks(true, '', mocks, '*-mocks', 'mocks-directory');

                expect(mocks).to.deep.equal({});
            });

            it('not shouldUseDirectoryOnly should not add any mock to the mocks object', function () {
                searchForMocks(false, '', mocks, '*-mocks', 'mocks-directory');

                expect(mocks).to.deep.equal({});
            });
        });
    });

    describe('with a directory directoryPath', function () {
        // PENDING TO TEST
    });

    describe('with a non directory or non file directoryPath', function () {

        beforeEach(function () {
            statMock.isFile.returns(false);
            statMock.isDirectory.returns(false);

            fs.statSync.returns(statMock);
        });

        it('should not add any mock to the mocks object', function() {
            searchForMocks(false, '', mocks, '*-mocks', 'mocks-directory');

            expect(mocks).to.deep.equal({});
        });
    });
});