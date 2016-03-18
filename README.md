# aliasify-mocks
NPM package to mock all modules founded into specific directories

### Introduction

This package is intended to allow mocking all modules or files without too much effort. The idea is to provide folders
recursively search for a fileName pattern. When a the file required will be replaced with the matched mock.

### Usage

This is a common configuration object to use with `aliasify-mocks`:

```
var aliases = {};

aliasifyModules({
    directories: [
        'project/src'
    ],
    modules: 'libs/test/modules-mocks',
    mockFilePattern: '-dummy.js',
    mockFolderPattern: 'mocks',
    aliases: aliases
});
```

As example if you have this files into your folder structure

```
project/src/mocks/mock-1-dummy.js
project/src/mocks/mock-2-dummy.js
project/src/mocks/mock-3-dummy.js
project/src/mocks/mock-4-dummy.js
libs/test/modules-mocks/browserify-dummy.js
libs/test/modules-mocks/gulp-dummy.js
```

You will get the following injection of mocks

```
project/src/mock-1.js -> project/src/mocks/mock-1-dummy.js
project/src/mock-2.js -> project/src/mocks/mock-2-dummy.js
project/src/mock-3.js -> project/src/mocks/mock-3-dummy.js
project/src/mock-4.js -> project/src/mocks/mock-4-dummy.js
browserify -> libs/test/modules-mocks/browserify-dummy.js
gulp -> libs/test/modules-mocks/gulp-dummy.js
```

#### Parameters

##### directories

Array of directories to search for mocks. The module will search recursively into all folders inside those directories,
trying to find files matching the provided pattern. This parameters is optional, need to allow the module search for
mocks.

##### modules

Receives `String`, `Array` or `Object`

If a `String` is provided it will search for modules mocks in this directory,
the ones matching the provided pattern will be injected.

If an `Array` of `String` is provided it will search for modules mocks in each of those directories, the ones matching
the provided pattern will be injected.

If an `Object` is provided it will extend the provided object into the `aliases` object. The extend process will be made
using `lodash`.

##### mockFilePattern

String pattern used to match mock files. By default `-dummy.js` will be used.

##### mockFolderPattern

String patter used to mach mock folders. By default 'mocks' will be used.

##### aliases

Package aliasify aliases, this are the required modules to be replaced. This object will be populated by the module.