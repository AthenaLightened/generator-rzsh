'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jst");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-requirejs");



    grunt.initConfig({
        clean: {
            options: {
                force: true
            },
            dist: [
                "../webroot/index.html",
                "../webroot/scripts/",
                "../webroot/css/",
                "../webroot/images/"
            ]
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'app/{,*/}*.js',
                '!app/components/{,*/}*.js'
            ]
        },
        copy: {
            dist: {
                files: [{
                    src: 'app/components/requirejs/require.js',
                    dest: '../webroot/app/components/requirejs/require.js'
                }]
            }
        },
        jst: {
            options: {
                amd: false,
                processName: function (name) {
                    return name.replace(/^.*?templates\/(.*?).tpl/, '$1');
                }
            },
            compile: {
                files: {
                    '../webroot/scripts/templates.js': ['app/templates/*.tpl']
                }
            }
        },
        requirejs: {
            dist: {
                options: {
                    name: "main",
                    baseUrl: "app",
                    mainConfigFile: "app/config.js",
                    optimize: 'none',
                    out: "../webroot/scripts/main.js"
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },

            dist: {
                files: [{
                    src: [
                        "../webroot/scripts/templates.js",
                        "../webroot/scripts/main.js"
                    ],
                    dest: "../webroot/scripts/all.js"
                }]
            }
        },
        uglify: {
            dist: {
                options: {
                    sourceMap: "../webroot/scripts/all.map.js",
                    sourceMapPrefix: 3,
                    sourceMappingURL: "all.map.js"
                },
                files: [{
                    src: "../webroot/scripts/all.js",
                    dest: "../webroot/scripts/all.min.js"
                }]
            }
        }
    });

    grunt.registerTask('createDistHTML', function () {
        var index = grunt.file.read("index.html");
        index = index.replace(/app\/config/, 'scripts/all.min');
        grunt.file.write("../webroot/index.html", index);
    });


    grunt.registerTask('build', [
        'jshint',
        'clean',
        'jst',
        'requirejs',
        'concat',
        'uglify',
        'copy',
        'createDistHTML'
    ]);

    grunt.registerTask('default', [
        'jshint'
    ]);
};
