# grunt-bump-assemblyinfo

> Grunt plugin to bump the version entry inside an assembly info file

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-bump-assemblyinfo --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-bump-assemblyinfo');
```

## The "bump_assemblyinfo" task

### Overview
In your project's Gruntfile, add a section named `bump_assemblyinfo` to the data object passed into `grunt.initConfig()`.

```js
bump_assemblyinfo: {
    sharedAssembly: {
        options: { },
        src: "./pathToFile/AssemblyInfo.cs",
        dest: "./pathToFile/AssemblyInfo.out.cs",
    }
},
```

### Options

#### options.version
Type: `String`
Default value: `''`

The hard wired version number to use. 

#### options.usePackageVersion
Type: `Boolean`
Default value: `true`

A flag to determine if the version should be taken from the package.json file.  If this value
is true the version option will be ignored.

#### options.packageFile
Type: `String`
Default value: `./package.json`

A path and file name of the package.json file which contains the version to use for the bump.
If this file path and name is not correct an error will be thrown.


#### options.keys
Type: `String Array`
Default value: `['AssemblyVersion','AssemblyFileVersion']`

A set of values that will be searched for inside the assembly file.  The deafaults should always work, but you can add your own if you like.

### Usage Examples

#### Default Options
In this example, the default options and will update the version values in the files

```js
grunt.initConfig({
    bump_assemblyinfo: {
        sharedAssembly: {
            options: { },
            src: "./pathToFile/AssemblyInfo.cs",
            dest: "./pathToFile/AssemblyInfo.out.cs",
        }
    },
});
```

#### Custom Options
In this example, we going turn off the use of the package.json version and supply the version directly.

```js
grunt.initConfig({
    bump_assemblyinfo: {
        sharedAssembly: {
            options: {
                usePackageVersion: false,
                version: "2.2.3.4"
            },
            src: "./test/files/AssemblyInfo.cs",
            dest: "./test/files/AssemblyInfo.out.cs",
        }
    },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
