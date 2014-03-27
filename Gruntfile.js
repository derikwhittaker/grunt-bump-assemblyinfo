/*
* grunt-bump-assemblyinfo
* https://github.com/derikwhittaker/grunt-bump-assemblyinfo
*
* Copyright (c) 2014 Derik Whittaker
* Licensed under the MIT license.
*/

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
    
        // Configuration to be run (and then tested).
        bump_assemblyinfo: {
            sharedAssembly: {
                options: {
                    debug: true,
                    usePackageVersion: false,
                    version: "2.2.3.4"
                },
                src: "./test/files/AssemblyInfo.cs",
                dest: "./test/files/AssemblyInfo.out.cs",
            }
        },
    
    
    });

// Actually load this plugin's task(s).
grunt.loadTasks('tasks');

// These plugins provide necessary tasks.

// By default, lint and run all tests.
grunt.registerTask('default', ['bump_assemblyinfo']);

};
