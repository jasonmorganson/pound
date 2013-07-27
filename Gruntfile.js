module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js'],
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app: {
        src: ['app/**/*.js']
      }

    },

    concat: {
      dist: {
        src: ['public/*.css'],
        dest: 'public/styles.css'
      }
    },

    cssmin: {
      minify: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          'public/styles.min.css': ['public/styles.css']
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'public/scripts.min.js': ['public/*.js']
        }
      }
    },

    styl: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/assets/stylesheets/',
          src: ['*.styl'],
          dest: 'public/',
          ext: '.css'
        }],
      }
    },

    component: {
      build: {
        options: {
          args: {
            out: 'public'
          }
        }
      }
    }

  })

  grunt.loadNpmTasks('grunt-styl')
  grunt.loadNpmTasks('grunt-component')
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('lint', ['jshint:all'])
  grunt.registerTask('default', ['component', 'styl', 'concat', 'cssmin', 'uglify'])

}
