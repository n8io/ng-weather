var moment = require('moment');
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  var timestampMs = (new Date()).getTime();
  var timestamp = moment().format('ddd ll HH:mmZZ') + ' [ ' + timestampMs + ' ]';

  var setup = {
    baseUrl: null,
    jadeSrcFileArr: [
      'index.jade'
    ],
    jadeWatchFileArr: [
      './src/server/views/**/*.jade'
    ],
    stylusWatchFileArr: [
      './src/server/css/**/*.styl'
    ],
    stylusSrcFileArr: [
      './src/server/css/style.styl'
    ],
    cssSrcFileArr: [
      './src/client/css/style.min.css'
    ],
    jsWatchFileArr: [
      './src/server/js/**/*.js'
    ],
    jsNgSrcFileArr: [
      './src/server/js/ng/app.js',
      './src/server/js/ng/constants.js',
      './src/server/js/ng/values.js',
      './src/server/js/ng/config.js',
      './src/server/js/ng/filters.js',
      './src/server/js/ng/services.js',
      './src/server/js/ng/factories.js',
      './src/server/js/ng/controllers.js',
      './src/server/js/ng/directives.js',
    ],
    staticsWatchFileArr: [
      './src/server/statics/**/*'
    ]
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      clean: {
        options: {
          stdout: true,
          execOptions: {
            cwd: '.' //Up to proj root
          }
        },
        command: ['rm -rf ./src/client','rm -rf ./tmp'].join(' && ')
      },
      cleanNg: {
        options: {
          stdout: true,
          execOptions: {
            cwd: '.' //Up to proj root
          }
        },
        command: [
          'mv src/client/js/ng/ng.min.js src/client/js/ng.min.js',
          'rm -rf src/client/js/ng/*.js',
          'rm -rf src/client/ng',
          'mv src/client/js/ng.min.js src/client/js/ng/ng.min.js'
        ].join(' && ')
      }
    },
    copy: {
      assets: {
        files: [
          {
            expand: true,
            cwd: 'src/server/statics',
            src: '**',
            dest: 'src/client/statics',
            flatten: false
          }
        ]
      },
      js: {
        files: [
          {
            expand: true,
            cwd: './src/server/js',
            src: '**',
            dest: './src/client/js',
            ext: '.min.js',
            flatten: false,
            filter: 'isFile'
          }
        ]
      }
    },
    jshint: {
      all: {
        src: ['./src/server/js/**/*.js'],
        options: {
          jshintrc: true
        }
      }
    },
    uglify: {
      devNg: {
        options : {
          mangle: false,
          compress: false,
          preserveComments: 'some',
          beautify: {
            beautify: true,
            indent_level: 2
          }
        },
        files: [{
          expand: true,
          cwd: './src/client/js/ng',
          src: ['**/*.js'],
          dest: './src/client/js/ng',
          ext: '.min.js'
        }]
      },
      prodNgCommon: {
        options : {
          mangle: true,
          compress: true,
          banner : '/* Minified via UglifyJs ' + timestamp + ' */\n'
        },
        files: {
          './src/client/js/ng/ng.min.js': ['./src/client/js/ng/*.min.js']
        }
      },
      prodNg: {
        options : {
          mangle: true,
          compress: true,
          banner : '/* Minified via UglifyJs ' + timestamp + ' */\n'
        },
        files: [{
          expand: true,
          cwd: './src/client/js/ng',
          src: '**/*.js',
          dest: './src/client/js/ng',
          ext: '.min.js'
        }]
      }
    },
    stylus: {
      dev: {
        options: {
          paths: ['./css'],
          import: ['nib'], // use stylus plugin at compile time
          linenos: true,
          compress: false
        },
        files: {
          './src/client/css/style.min.css': setup.stylusSrcFileArr
        }
      },
      prod: {
        options: {
          paths: ['./css'],
          import: ['nib'], // use stylus plugin at compile time
          linenos: false,
          compress: true,
          banner: '/* Minified via Stylus on ' + timestamp + '*/\n'
        },
        files: {
          './src/client/css/style.min.css': setup.stylusSrcFileArr
        }
      }
    },
    jade: {
      dev: {
        options: {
          pretty: true,
          data: {
            baseUrl: setup.baseUrl,
            cacheKey: timestampMs,
            env: 'dev'
          }
        },
        files: [
          {
            expand: true,
            cwd: './src/server/views',
            src: setup.jadeSrcFileArr,
            dest: 'src/client/',
            ext: '.html'
          }
        ]
      },
      prod: {
        options: {
          pretty: false,
          data: {
            baseUrl: setup.baseUrl,
            cacheKey: timestampMs,
            env: 'prod'
          }
        },
        files: [
          {
            expand: true,
            cwd: './src/server/views',
            src: setup.jadeSrcFileArr,
            dest: 'src/client/',
            ext: '.html'
          }
        ]
      }
    },
    cssmin: {
      prod: {
        options:{
          keepSpecialComments: 0,
          banner : '/* Minified via CssMin ' + timestamp + ' */'
        },
        files: {
          './src/client/css/style.min.css': setup.cssSrcFileArr
        }
      }
    },
    concat: {
      dev: {
        src: setup.jsNgSrcFileArr,
        dest: './src/client/js/ng/ng.min.js'
      }
    },
    ngAnnotate: {
      dev: {
        files: [
          {
            expand: true,
            cwd: './src/client/js/ng',
            src: '**/*.min.js',
            dest: './src/client/js/ng',
            ext: '.min.js'
          }
        ]
      }
    },
    prettify: {
      options: {
        indent: 2,
        unformatted: []
      },
      index: {
        src: './src/client/index.html',
        dest: './src/client/index.html'
      }
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: setup.jsWatchFileArr,
        tasks: ['dev'],
        options: {
          nospawn: false,
          interrupt: false
        }
      },
      css: {
        files: setup.stylusWatchFileArr,
        tasks: ['dev'],
        options: {
          nospawn: false,
          interrupt: false
        }
      },
      jade: {
        files: setup.jadeWatchFileArr,
        tasks: ['dev'],
        options: {
          nospawn: false,
          interrupt: false
        }
      },
      statics: {
        files: setup.staticsWatchFileArr,
        tasks: ['dev'],
        options: {
          nospawn: false,
          interrupt: false
        }
      }
    }
  });

  // Environment agnostic
  grunt.registerTask('preprocess', [
    'shell:clean',
  ]);

  grunt.registerTask('postprocess', [
    'shell:cleanNg'
  ]);

  // Dev build
  grunt.registerTask('dev', [
    'preprocess',
    'jade:dev',
    'copy:assets',
    'copy:js',
    'stylus:dev',
    'concat:dev',
    'jshint',
    'ngAnnotate',
    'uglify:devNg',
    'prettify',
    'postprocess'
  ]);

  // Alias for Prod build
  grunt.registerTask('prod', [
    'default'
  ]);

  // Dev watcher
  grunt.registerTask('watcher', 'Fires minify css and js, then watches for changes', [
    'dev',
    'watch'
  ]);

  // Prod build (default task)
  grunt.registerTask('default', [
    'preprocess',
    'jade:prod',
    'copy:assets',
    'copy:js',
    'stylus:prod',
    'cssmin:prod',
    'ngAnnotate',
    'uglify:prodNg',
    'uglify:prodNgCommon',
    'postprocess'
  ]);
};