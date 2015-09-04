module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('bower.json');
    // Project configuration.
    grunt.initConfig({
        pkg: pkg,
        files: "<%= pkg.gruntFiles %>",
        uglify: {
            options: {
                banner: "/* <%= pkg.name %><%= pkg.version %> <%= grunt.template.today('yyyy-mm-dd') %> */\n",
                sourceMap: true,
                sourceMapName: "dist/<%= pkg.name %>.map"
            },
            js: {
                src: "dist/<%= pkg.name %>.js",
                dest: "dist/<%= pkg.name %>.min.js"
            }
        },
        concat: {
            js: {
                options: {
                    //stripBanners: true,
                    banner: "(function(){\n",
                    footer: "\nwindow.<%= pkg.name %> = <%= pkg.name %>;\n})();"
                },
                files: pkg.gruntFiles.js
            },
            css:{
                files: pkg.gruntFiles.css
            }
        },
        cssmin: {
            options: {
                sourceMap: true,
                aggressiveMerging : false,
                advanced : false,
                roundingPrecision : -1,
                shorthandCompacting: false,
                keepSpecialComments: '*'
            },
            target: {
                files: {
                    "dist/<%= pkg.name %>.min.css" : ["dist/<%= pkg.name %>.css"]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-debug-task');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ["concat","uglify","cssmin"]);

};