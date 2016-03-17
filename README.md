# aliasify-mocks
NPM package to mock all modules founded into specific directories

**Example of usage:**

```
aliasifyModules({
    directories: [
        'project/src'
    ],
    modules: 'libs/test/modules-mocks',
    mockFilePattern: '-mock.js',
    aliases: aliases
});
```