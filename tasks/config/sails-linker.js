module.exports = function(grunt) {
  var pipeline = require('../pipeline');
  var util = require('util');
  grunt.config.set('sails-linker', {
    devJs: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileRef: function(filepath) {
          var tmpl = '<script src="{{.Site.BaseURL}}%s"></script>';
          //replace only the first occurrence of / to avoid double backslash from the BaseURL
          return util.format(tmpl, filepath.substring(filepath.indexOf("/")).replace("/", ''));
        },
        appRoot: 'src/'
      },
      files: {
        'layouts/partials/script.html': pipeline.tranquilpeakJsFilesToInject
      }
    },
    devCss: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileRef: function(filepath) {
          var tmpl = '<link rel="stylesheet" href="{{.Site.BaseURL}}%s" />';
          return util.format(tmpl, filepath.substring(filepath.indexOf("/")).replace("/", ''));
        },
        appRoot: 'src/'
      },
      files: {
        'layouts/partials/head.html': pipeline.tranquilpeakCssFilesToInject
      }
    },
    prodJs: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileRef: function(filepath) {
          var tmpl = '<script src="{{.Site.BaseURL}}%s"></script>';
          return util.format(tmpl, filepath.substring(filepath.indexOf("/")).replace("/", ''));
        },
        appRoot: 'src/'
      },
      files: {
        'layouts/partials/script.html': 'static/js/*.min.js'
      }
    },
    prodCss: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileRef: function(filepath) {
          var tmpl = '<link rel="stylesheet" href="{{.Site.BaseURL}}%s" />';
          return util.format(tmpl, filepath.substring(filepath.indexOf("/")).replace("/", ''));
        },
        appRoot: 'src/'
      },
      files: {
        'layouts/partials/head.html': 'static/css/*.min.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-sails-linker');
};
