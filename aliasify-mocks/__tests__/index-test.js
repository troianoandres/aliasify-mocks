describe('When aliasifyMocks method is called', function () {
    var aliasifyMocks = require('../index');
    var configMock;
    var searchForMocks = require('./src/search-for-mocks');
    var searchForMocksFunction;

    beforeEach(function () {
        configMock = {
            aliases: {}
        };

        searchForMocksFunction = stub();
        searchForMocks.bind.reset().returns(searchForMocksFunction);
    });

    describe('with defined array of directories', function () {

        beforeEach(function () {
            configMock['directories'] = [
                'directory-1/directory-3',
                'directory-2'
            ];
        });

        it('should call searchForMocks the amount of times as directories we provide', function () {
            aliasifyMocks(configMock);

            expect(searchForMocks.bind)
                .to.have.callCount(1);
            expect(searchForMocksFunction)
                .to.have.callCount(2)
                .to.have.been.calledWith('directory-1/directory-3')
                .to.have.been.calledWith('directory-2');
        });

        describe('modules as String', function () {

            beforeEach(function () {
                configMock['modules'] = 'lib-test/modules-mocks';
            });

            it('should call searchForMocks the amount of times as directories we provide plus one module', function () {
                aliasifyMocks(configMock);

                expect(searchForMocks.bind)
                    .to.have.callCount(2);
                expect(searchForMocksFunction)
                    .to.have.callCount(3)
                    .to.have.been.calledWith('directory-1/directory-3')
                    .to.have.been.calledWith('directory-2')
                    .to.have.been.calledWith('lib-test/modules-mocks');
            });
        });

        describe('modules as Array', function () {

            beforeEach(function () {
                configMock['modules'] = [
                    'lib-test/modules-mocks-1',
                    'lib-test/modules-mocks-2'
                ];
            });

            it('should call searchForMocks the amount of times as directories we provide plus the amount of modules', function () {
                aliasifyMocks(configMock);

                expect(searchForMocks.bind)
                    .to.have.callCount(2);
                expect(searchForMocksFunction)
                    .to.have.callCount(4)
                    .to.have.been.calledWith('directory-1/directory-3')
                    .to.have.been.calledWith('directory-2')
                    .to.have.been.calledWith('lib-test/modules-mocks-1')
                    .to.have.been.calledWith('lib-test/modules-mocks-2');
            });
        });

        describe('modules as Object', function () {

            beforeEach(function () {
                configMock['modules'] = {
                    'fs': 'lib-test/modules-mocks/fs-mock.js',
                    'path': 'lib-test/modules-mocks/path-mock.js',
                    'validator': 'lib-test/modules-mocks/validator-mock.js'
                };
            });

            it('should call searchForMocks the amount of times as directories we provide and extend the modules', function () {
                aliasifyMocks(configMock);

                expect(searchForMocks.bind)
                    .to.have.callCount(1);
                expect(searchForMocksFunction)
                    .to.have.callCount(2)
                    .to.have.been.calledWith('directory-1/directory-3')
                    .to.have.been.calledWith('directory-2');
                expect(configMock.aliases).to.deep.equal({
                    'fs': 'lib-test/modules-mocks/fs-mock.js',
                    'path': 'lib-test/modules-mocks/path-mock.js',
                    'validator': 'lib-test/modules-mocks/validator-mock.js'
                });
            });
        });

        describe('modules as other dataType', function () {

            beforeEach(function () {
                configMock['modules'] = true;
            });

            it('should call searchForMocks the amount of times as directories we provide', function () {
                aliasifyMocks(configMock);

                expect(searchForMocks.bind)
                    .to.have.callCount(1);
                expect(searchForMocksFunction)
                    .to.have.callCount(2)
                    .to.have.been.calledWith('directory-1/directory-3')
                    .to.have.been.calledWith('directory-2');
            });
        });
    });

    describe('with defined directories but not an array', function () {

        beforeEach(function () {
            configMock['directories'] = true;
        });

        it('should call searchForMocks the amount of times as directories we provide', function () {
            aliasifyMocks(configMock);

            expect(searchForMocks.bind)
                .to.have.callCount(0);
            expect(searchForMocksFunction)
                .to.have.callCount(0);
        });

        describe('modules as String', function () {

            beforeEach(function () {
                configMock['modules'] = 'lib-test/modules-mocks';
            });

            it('should call searchForMocks the amount of times as directories we provide plus one module', function () {
                aliasifyMocks(configMock);

                expect(searchForMocks.bind)
                    .to.have.callCount(1);
                expect(searchForMocksFunction)
                    .to.have.callCount(1)
                    .to.have.been.calledWith('lib-test/modules-mocks');
            });
        });

        describe('modules as Array', function () {

            beforeEach(function () {
                configMock['modules'] = [
                    'lib-test/modules-mocks-1',
                    'lib-test/modules-mocks-2'
                ];
            });

            it('should call searchForMocks the amount of times as directories we provide plus the amount of modules', function () {
                aliasifyMocks(configMock);

                expect(searchForMocks.bind)
                    .to.have.callCount(1);
                expect(searchForMocksFunction)
                    .to.have.callCount(2)
                    .to.have.been.calledWith('lib-test/modules-mocks-1')
                    .to.have.been.calledWith('lib-test/modules-mocks-2');
            });
        });

        describe('modules as Object', function () {

            beforeEach(function () {
                configMock['modules'] = {
                    'fs': 'lib-test/modules-mocks/fs-mock.js',
                    'path': 'lib-test/modules-mocks/path-mock.js',
                    'validator': 'lib-test/modules-mocks/validator-mock.js'
                };
            });

            it('should call searchForMocks the amount of times as directories we provide and extend the modules', function () {
                aliasifyMocks(configMock);

                expect(searchForMocks.bind)
                    .to.have.callCount(0);
                expect(searchForMocksFunction)
                    .to.have.callCount(0);
                expect(configMock.aliases).to.deep.equal({
                    'fs': 'lib-test/modules-mocks/fs-mock.js',
                    'path': 'lib-test/modules-mocks/path-mock.js',
                    'validator': 'lib-test/modules-mocks/validator-mock.js'
                });
            });
        });

        describe('modules as other dataType', function () {

            beforeEach(function () {
                configMock['modules'] = true;
            });

            it('should call searchForMocks the amount of times as directories we provide', function () {
                aliasifyMocks(configMock);

                expect(searchForMocks.bind)
                    .to.have.callCount(0);
                expect(searchForMocksFunction)
                    .to.have.callCount(0);
            });
        });
    });
});