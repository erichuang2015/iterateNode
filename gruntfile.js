module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    // Project configuration.
    grunt.initConfig({
        pkg: pkg,
        files: {
            "js": {
                "dist/iterateNode.js": ["src/js/**/*.js"]
            },
            "css":{
                "dist/iterateNode.css": "src/css/iterateNode-layout-3.css"
            }
        },
        uglify: {
            options: {
                banner: "/* iterateNode<%= pkg.version %> <%= grunt.template.today('yyyy-mm-dd') %> */\n",
                sourceMap: true,
                sourceMapName: "dist/iterateNode.min.js.map"
            },
            js: {
                src: "dist/iterateNode.js",
                dest: "dist/iterateNode.min.js"
            }
        },
        concat: {
            js: {
                options: {
                    //stripBanners: true,
                    banner: "(function(){\n",
                    footer: "\nwindow.iterateNode = iterateNode;\n})();"
                },
                files: {
                    "dist/iterateNode.js": ["src/js/**/*.js"]
                }
            },
            css:{
                files: {
                    "dist/iterateNode.css": "src/css/iterateNode-layout-3.css"
                }
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
                    "dist/iterateNode.min.css" : ["dist/iterateNode.css"]
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