module.exports = function(grunt) {

  grunt.initConfig({

    styl: {
      dist: {
        files: {
          'public/styles.css': 'app/assets/stylesheets/*.styl'
        }
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

  grunt.registerTask('default', ['styl','component'])

}
