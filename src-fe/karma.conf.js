// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-jasmine-html-reporter',
      'karma-coverage-istanbul-reporter',
      'karma-coverage',
      'karma-sonarqube-unit-reporter',
      '@angular-devkit/build-angular/plugins/karma',
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: path.join(__dirname, './coverage/'),
      reports: ['html', 'lcov', 'text-summary'],
      fixWebpackSourcePaths: true,
    },
    reporters: ['progress', 'kjhtml','sonarqubeUnit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    sonarQubeUnitReporter: {
      sonarQubeVersion: 'LATEST',
      outputFile: 'reports/test-reporter_fe.xml',
      overrideTestDescription: true,
      testPaths: ['./src'],
      testFilePattern: '.spec.ts',
      prependTestFileName: 'src-fe',
      useBrowserName: false
},
    browsers: ['Chromium'],

    customLaunchers: {
      Headless: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-setuid-sanbox'
        ]
      }
    },
    singleRun: false,
    restartOnFileChange: true,
  });
};
