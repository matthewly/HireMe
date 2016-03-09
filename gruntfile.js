module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.initConfig({
    clean: ["public/js"],
    uglify: {
      my_target: {
        options: {
          mangle: false
        },
        files: {
          'public/js/script.js': ['source_js/script.js'],
          'public/js/app.js': ['source_js/app.js'],
          'public/js/controllers.js': ['source_js/controllers.js'],
        } //files
      } //my_target
    }, //uglify
    copy: {
      files: {
            expand : true,
            dest   : 'public/js',
            cwd    : 'js',
            src    : [
              '**/*.js'
            ]
      }
    },
    compass: {
      dev: {
        options: {
          config: 'compass_config.rb'
        } //options
      }, //dev
      foundation: {
        options: {
          config: 'compass_foundation_config.rb'
        } //options
      } //foundation

    }, //compass
    watch: {
      options: { livereload: true },
      scripts: {
        files: ['source_js/*.js'],
        tasks: ['clean','uglify'],
        //tasks: ['copy']
      }, //script
      sass: {
        files: ['source_sass/*.scss'],
        tasks: ['compass:dev','compass:foundation']
      }, //sass
      sass_foundation: {
        files: ['public/foundation6_lib/scss/foundation.scss',
                'public/foundation6_lib/scss/*.scss',
                'public/foundation6_lib/scss/components/*.scss',
                'public/foundation6_lib/scss/forms/*.scss',
                'public/foundation6_lib/scss/grid/*.scss',
                'public/foundation6_lib/scss/settings/*.scss',
                'public/foundation6_lib/scss/typography/*.scss',
                'public/foundation6_lib/scss/util/*.scss',
        ],
        tasks: ['compass:dev', 'compass:foundation']
      }, //sass_foundation
      html: {
        files: ['public/*.html']
      }
    }, //watch
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'app.js'
        }
      }
  }
  }) //initConfig
  grunt.registerTask('default', ['express:dev', 'watch', 'uglify']);
} //exports
