browserify = require('browserify');

module.exports = function (grunt) {
  'use strict';
  
  grunt.registerMultiTask('browserify', 'Browserify support for Grunt', function () {

    var done = this.async();
    var b = browserify();

    if (this.data.beforeHook) {
      this.data.beforeHook.call(this, b);
    }
    
    (this.data.requires || []).forEach(function (req) {
      var file, opts = {};
      if (typeof req === 'object') {
        file = req[0];
        opts = req[1];
      } else {
        file = req;
      }
    
      grunt.verbose.writeln('Adding "' + file + '" to the required module list');
      b.require(file, opts);
    });
    
    if (this.data.hook) {
      this.data.hook.call(this, b);
    }
    
    var self = this;

    b.bundle(function(err, src) {
      if (!err) {
        grunt.file.write(self.data.dest || self.target, src);
      } else {
        
      }
      done();
    });

  });
    
};