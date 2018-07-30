module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'src/new_new_js/**/*.js',
            'test/unit/**/*.js'
        ],
        browsers: ['PhantomJS'],
        reporters: ["spec",'html'],

        // the default configuration
        htmlReporter: {
            outputDir: 'karma_html', // where to put the reports
            templatePath: null, // set if you moved jasmine_template.html
            focusOnFailures: true, // reports show failures on start
            namedFiles: false, // name files instead of creating sub-directories
            pageTitle: null, // page title for reports; browser info by default
            urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
            reportName: 'report-summary-filename', // report summary filename; browser info by default


            // experimental
            preserveDescribeNesting: false, // folded suites stay folded
            foldAll: false // reports start folded (only with preserveDescribeNesting)
        },
        specReporter: {
            maxLogLines: 15,         // limit number of lines logged per test
            suppressErrorSummary: false,  // do not print error summary
            suppressFailed: false,  // do not print information about failed tests
            suppressPassed: false,  // do not print information about passed tests
            suppressSkipped: false,  // do not print information about skipped tests
            showSpecTiming: true // print the time elapsed for each spec
        },
        plugins : ['karma-jasmine', 'karma-phantomjs-launcher','karma-spec-reporter','karma-html-reporter']
    })
};