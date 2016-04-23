module.exports = function(config) {
	config.set({
		frameworks: ['mocha', 'chai','sinon-chai'],
		files: [
		'asset/angular/angular.js',
		'asset/angular-route/angular-route.js',
		'asset/angular-mocks/angular-mocks.js',
		'ng/**/module.js',
		'ng/**/*.js',
		'test/ng/**/*.spec.js'
		],
		reporters: ['progress'],
		port:9876,
		colors:true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['PhantomJS'],
		singleRun: false
	})
}