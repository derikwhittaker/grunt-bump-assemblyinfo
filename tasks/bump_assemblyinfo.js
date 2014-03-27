/*
 * grunt-bump-assemblyinfo
 * https://github.com/derikwhittaker/grunt-bump-assemblyinfo
 *
 * Copyright (c) 2014 Derik Whittaker
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('underscore');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

    function verifyFileExists(file){
       if( !grunt.file.exists(file) ){
            grunt.fail.fatal('The provided source file was either not found or not provided');
        }        
    }
    
    function cleanDestinationFile(src, dest){        
        if( src !== dest && grunt.file.exists(dest)){
            grunt.log.writeln('Deleting old destination file ' + dest);
            grunt.file.delete(dest);
        }     
    }    
    
    function getVersion(options){
        var VERSION_REGEXP = /([\'|\"]?version[\'|\"]?[ ]*:[ ]*[\'|\"]?)([\d||A-a|.|-]*)([\'|\"]?)/i;
        
        if( options.usePackageVersion){
        
            if( !grunt.file.exists(options.packageFile)){
                grunt.fail.fatal('The provided Package.json file was not found.  Please check the path and try again.');
            }
            
            var json = grunt.file.read(options.packageFile);
            var packageObject = JSON.parse(json);
            
            return packageObject.version;
        }
        
        if( options.version === "" ){
            grunt.fail.fatal('You did not specify a version to use');
        }
        
        return options.version;        
    }    
    
    grunt.registerMultiTask('bump_assemblyinfo', 'Grunt plugin to bump the version entry inside an assembly info file', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            usePackageVersion: true,
            packageFile: './package.json',
            version: '',
            keys: ['AssemblyVersion','AssemblyFileVersion'],
            debug: false
        });
    
        if( options.debug ){
            grunt.log.writeflags(options, 'Options');            
        }
        
        // determine where to get the version info from
        var version = getVersion(options);      
        grunt.log.writeln('Going to update to version ' + version );
        
        this.files.forEach(function(file){
            
            var src = file.src[0];
            var dest = file.dest;
            
            verifyFileExists(src); 
            cleanDestinationFile(src, dest);    
            
            var assemblyFile = grunt.file.read(src);
            var lines = assemblyFile.split('\n');
            
            options.keys.forEach(function(key){
                _.each(lines, function (line, index) {                    
                    if (line.indexOf(key) != -1) {
                        var foundVersion = line.match(/\d+\.\d+\.\d+\.\d+/g).toString();
                                                                                
                        lines[index] = line.replace(foundVersion, version);
                    }
                });                
            });
            
            var updatedAssemblyFile = lines.join('\n');
            grunt.file.write(dest, updatedAssemblyFile);            
            
        });
    });

};
