module.exports = function(grunt) {

  grunt.initConfig({


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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['component', 'styl', 'concat', 'cssmin', 'uglify'])

}
