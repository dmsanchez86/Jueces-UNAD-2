module.exports = function(grunt) {
	// Project configuration.
  	grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),

    	ngdocs: {
    		all: ['src/js/**/*.js'],
    		options: {
    			dest: 'docs',
    			title: "Documentación App Jueces",
    			styles: ['../dist/css/dmtheme.css'],
    		}
    	}
  	});

  	// Load the plugin that provides the "ngdocs" task.
  	grunt.loadNpmTasks('grunt-ngdocs');

  	// register task
    grunt.registerTask('default', ['ngdocs']);
}