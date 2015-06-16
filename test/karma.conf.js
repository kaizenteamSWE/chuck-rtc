module.exports = function(config){
  config.set({

    basePath :'..',

    files: [
      {pattern: 'bower_components/angular/angular.js', watched: false, included: true, served: true},
      {pattern: 'bower_components/angular-mocks/angular-mocks.js', watched: false, included: true, served: true},
      {pattern: 'bower_components/jquery/dist/jquery.min.js', watched: false, included: true, served: true},
      {pattern: 'bower_components/lodash/lodash.min.js', watched: false, included: true, served: true},
      {pattern: 'bower_components/**/*.js', watched: false, included: false, served: true},
      {pattern: 'test/deepequal.js', watched: false, included: true, served: true},
      {pattern: 'chuck.js', watched: false, included: true, served: true},
      {pattern: 'main/**/*.js', watched: true, included: false, served: true},
      {pattern: 'test/unit/*.js', watched: true, included: true, served: true},
      {pattern: 'test/integration/*.js', watched: true, included: true, served: true}
    ],

    

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};