/*
 * grunt-angular-templates
 * https://github.com/ericclemmons/grunt-angular-templates
 *
 * Copyright (c) 2013 Eric Clemmons
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	grunt
	      .initConfig({

	         // Basic settings and info about our plugins
	         pkg : grunt.file.readJSON('package.json'),

	         fetchFromCDN : {},

	         ngtemplates : {
		         app : {
		            src : [
		                  'identity/view/html/views/groups/viewGroup.html',
		                  'identity/view/html/views/confirmationDialog.html',
		                  'identity/view/html/views/identityMain.html',
		                  'identity/view/html/views/viewIdentity.html',
		                  'identity/view/javascript/components/forms/overlayForm.html',
		                  'identity/view/javascript/components/forms/uploadFile.html',
		                  'identity/view/javascript/components/grid/grid.html',
		                  'identity/view/javascript/components/grid/popup.html',
		                  'identity/view/javascript/components/main/identity.html'
		                   ],
		            dest :'build/js/identity.templates.js',
		            options : {
		               bootstrap : function(module, script) {
			               return 'var identityCachedTemplates = (["$templateCache", function($templateCache) {'
			                     + script + '}])';
		               },
		               htmlmin : {
		                  collapseBooleanAttributes : true,
		                  collapseWhitespace : true,
		                  removeAttributeQuotes : true,
		                  removeComments : true, // Only if you don't use comment directives!
		                  removeEmptyAttributes : true,
		                  removeRedundantAttributes : true,
		                  removeScriptTypeAttributes : true,
		                  removeStyleLinkTypeAttributes : true
		               },
		               url : function(url) {
			               return url.replace('identity/',
			                     '/identity/');
		               }
		            }
		         }
	         },
	         
	         ngAnnotate : {
	            options : {
		            singleQuotes : true
	            },
	            app : {
		            files : {
		            	'concat/min-safe/config.js' : [ 'identity/view/javascript/components/main/config.js'],
		               'concat/min-safe/layout.js' : [ 'identity/view/javascript/layout.js' ],
		               'concat/min-safe/module.js' : [ 'identity/view/javascript/module.js' ],
		               'concat/min-safe/loadingOverlay.js' : [ 'identity/view/javascript/components/loadingOverlay/loadingOverlay.min.js' ],
		               'concat/min-safe/overlayForm.js' : [ 'identity/view/javascript/components/forms/overlayForm.js'],
		               'concat/min-safe/uploadFile.js' : [ 'identity/view/javascript/components/forms/uploadFile.js'],
		               'concat/min-safe/grid.js' : [ 'identity/view/javascript/components/grid/grid.js'],
		               'concat/min-safe/formDefinitions.js' : [ 'identity/view/javascript/components/main/formDefinitions.js'],
		               'concat/min-safe/identity.js' : [ 'identity/view/javascript/components/main/identity.js']
		            }
	            }
	         },

	         concat : {
	            app : {
	               src : [
	               	'concat/min-safe/loadingOverlay.js',
	               	'concat/min-safe/identity.js',
	               	'concat/min-safe/config.js' ,
		               'concat/min-safe/layout.js' ,
		               'concat/min-safe/module.js',
		               'concat/min-safe/overlayForm.js',
		               'concat/min-safe/uploadFile.js',
		               'concat/min-safe/grid.js' ,
		               'concat/min-safe/formDefinitions.js',
	              ],
	               dest : 'build/app/js/identity.js'
	            },
	            
	            studio: {
	            	 src : [
	            		   'concat/min-safe/loadingOverlay.js',
	            		   'concat/min-safe/identity.js',
			               'concat/min-safe/overlayForm.js',
			               'concat/min-safe/uploadFile.js',
			               'concat/min-safe/grid.js' ,
			               'concat/min-safe/formDefinitions.js'
		              ],
		               dest : 'build/studio/js/identity.js'
	            },
	            

	            css : {
	               src : [
                     'identity/view/javascript/components/grid/grid.css'
	               ],
	               dest : 'build/css/identity.components.css'
	            }
	         },
	         
	         uglify : {
	            app : {
		            files : {
		               'build/app/js/identity.min.js' : [ 'build/app/js/identity.js' ]
		            }
	            },
	            studio : {
		            files : {
		               'build/studio/js/identity.min.js' : [ 'build/studio/js/identity.js' ]
		            }
	            }
	         },
	         
	         less : {
		         themes : {
			         files : {
			            'identity/view/css/identity.light.css' : 'identity/view/css/identity.light.less',
			            'identity/view/css/identity.dark.css' : 'identity/view/css/identity.dark.less',
			            'identity/view/css/app.light.css' : 'identity/view/css/app.light.less',
			            'identity/view/css/app.dark.css' : 'identity/view/css/app.dark.less'
			         }
		         }
	         },
	         
	         stripCssComments : {
	         	options: {
	               preserve: false 
	             },
	             dist: {
	                files: {
	                    'build/css/identity.components.stripped.css': 'build/css/identity.components.css',
	                    'build/css/identity.dark.stripped.css': 'identity/view/css/identity.dark.css',
                  	  'build/css/identity.light.stripped.css': 'identity/view/css/identity.light.css',
                  	  'build/css/app.light.stripped.css': 'identity/view/css/app.light.css',
                  	  'build/css/app.dark.stripped.css': 'identity/view/css/app.dark.css'
	                }
	            }
	         },
	         
	         cssmin : {
	           components : {
	               src : 'build/css/identity.components.stripped.css',
	               dest : 'build/css/identity.components.min.css'
	            },
	            light : {
	               src : 'build/css/identity.light.stripped.css',
	               dest : 'build/css/identity.light.min.css'
	            },
	            dark : {
	               src : 'build/css/identity.dark.stripped.css',
	               dest : 'build/css/identity.dark.min.css'
	            },
	            appLight: {
	            	src : 'build/css/app.light.stripped.css',
		            dest : 'build/css/app.light.min.css'
	            },
	            appDark: {
	            	src : 'build/css/app.dark.stripped.css',
		            dest : 'build/css/app.dark.min.css'
	            }
	         },

	         clean : {
		         folder : [ 'concat/', 'lib/' ]
	         }
	         
	        
	      });

	var fs = require('fs');
	var path = require('path');
	var request = require('request');
	var async = require('async');

	grunt.registerMultiTask('fetch_ag_grid', function() {
		var done = this.async();
		var options = this.options({
			separator : '\n',
		});
		async.eachSeries(this.files, function(file, next) {
			var out = '';
			async.eachSeries(file.orig.src, function(url, nextUrl) {
				if (grunt.file.exists(url)) {
					// If a file
					grunt.log.writeln('Concatenating ' + url);
					out += grunt.file.read(url) + options.separator;
					nextUrl();
				} else {
					// Otherwise assume a url
					grunt.log.writeln('Downloading ' + url);
					request(url).on('data', function(data) {
						out += data.toString();
					}).on('end', function() {
						out += options.separator;
						nextUrl();
					});
				}
			}, function() {
				grunt.file.write(file.dest, out);
				grunt.log.ok('Wrote ' + file.dest + '.');
				next();
			});
		}, done);
	});

	// Load the plugin
	grunt.loadNpmTasks('grunt-fetch-from-cdn');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-strip-css-comments');
	
	// Run the tasks
	grunt.registerTask('app', [ 
	      'ngtemplates:app', 
	      'ngAnnotate:app', 
	      'concat:app',
	      'less:themes',
	      'concat:css',
	      'uglify:app', 
	      'stripCssComments',
	      'cssmin:components',
	      'cssmin:light',
	      'cssmin:dark',
	      'cssmin:appLight',
	      'cssmin:appDark',
	      'clean:folder']);
	
	grunt.registerTask('studio', [ 
      'ngtemplates:app', 
      'ngAnnotate:app', 
      'concat:studio',
      'less:themes',
      'concat:css',
      'uglify:studio', 
      'stripCssComments',
      'cssmin:components',
      'cssmin:light',
      'cssmin:dark',
      'clean:folder']);
	
	grunt.registerTask('buildThemes', [ 'less:themes' ]);
};