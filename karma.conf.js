var aliases = require('./package.json').aliasify.aliases;
var dirnameRegExp = new RegExp(__dirname);
var coverageifyConfig = {
    ignores: [
        /\.json$/,
        /__tests__/,
        /__imtegration__/,
        /__mocks__/
    ],
    contains: [
        dirnameRegExp
    ]
};

process.env.NODE_PATH = __dirname;

module.exports = function(config) {
    config.set({

        basePath: './',

        frameworks: ['browserify', 'mocha'],

        files: [
            'lib-test/global.js',
            'aliasify-mocks/src/**/__tests__/*-test.js',
            'aliasify-mocks/src/**/__integration__/*-integration.js'
        ],

        preprocessors: {
            'lib-test/global.js': [ 'browserify' ],
            'aliasify-mocks/src/**/__tests__/*-test.js': [ 'browserify' ],
            'aliasify-mocks/src/**/__integration__/*-integration.js': [ 'browserify' ]
        },

        browserify: {
            debug: true,
            transform: [ ['coverageify', coverageifyConfig], [ 'rewireify' ], 'aliasify' ]
        },

        browsers : ['PhantomJS'],

        reporters: ['progress', 'coverage'],

        coverageReporter : {
            dir: 'test-coverage',
            reporters: [
                {type: 'html', subdir: 'html'},
                {type: 'cobertura', subdir: 'cobertura'}
            ]
        },

        logLevel: config.LOG_ERROR,

        singleRun: false,

        autoWatch: true

    });
};
