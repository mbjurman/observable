module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      lib: {
        files: {
          'dist/observable.min.js': 'src/observable.js'
        }
      }
    },
    jasmine: {
      observable: {
        src: ['src/observable.js'],
        options: {
          specs: ['test/observable-spec.js'],
          keepRunner: false,
          template: require('grunt-template-jasmine-requirejs')
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'jasmine']);
};