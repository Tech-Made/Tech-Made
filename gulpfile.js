//gulp plugins
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
// header provides $switcher variable to scss to add or remove switcher styles (demo and production versions)
var header      = require('gulp-header');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');

//postCss
var postcss     = require('gulp-postcss');
var autoprefixer= require('autoprefixer');
var flexbugs    = require('postcss-flexbugs-fixes');
var stylefmt    = require('stylefmt');

//js concat
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

//template scripts
var scripts = [
	//jQuery not need in WP
	//libs

	// 'js/vendor/jquery-1.12.4.min.js',
	// 'js/vendor/jquery-migrate-3.0.0.min.js',
    'js/vendor/jquery-3.3.1.min.js',
	// 'js/vendor/popper.min.js',
	'js/vendor/bootstrap.bundle.js',

	// 	//no npm
	'js/vendor/affix.js',
	'js/vendor/jquery.appear.js',
	'js/vendor/jquery.cookie.js',

	//menu
    	//no npm
	'js/vendor/jquery.easing.1.3.js',
    	//no npm
	'js/vendor/jquery.hoverIntent.js',
	'js/vendor/superfish.js',

	// //elements
	'js/vendor/bootstrap-progressbar.min.js',
	'js/vendor/jquery.countdown.min.js',
	'js/vendor/jquery.countTo.js',
	'js/vendor/jquery.easypiechart.min.js',
    //
	// //local scrolling
	'js/vendor/jquery.scrollbar.min.js',
		//https://github.com/flesler/jquery.localScroll
	'js/vendor/jquery.localScroll.min.js',
		//https://github.com/flesler/jquery.scrollTo
	'js/vendor/jquery.scrollTo.min.js',
	'js/vendor/jquery.ui.totop.js',

	// //images-sliders
	'js/vendor/jquery.parallax-1.1.3.js',
	//prettyPhoto removed - not support jQuery v3 even with migration plugin
	// 'js/vendor/jquery.prettyPhoto.js',
	'js/vendor/isotope.pkgd.min.js',
	'js/vendor/jquery.flexslider-min.js',
	'js/vendor/owl.carousel.min.js',

	//new photoswipe gallery
	'js/vendor/photoswipe.js',
	'js/vendor/photoswipe-ui-default.min.js',

	//social
	'js/vendor/jflickrfeed.min.js',
	'js/vendor/spectragram.min.js',
	'twitter/jquery.tweet.js',
];

//dependencies from node_modules
var vendorScripts = [
//JS files
	'node_modules/jquery/dist/jquery.min.js',
	'node_modules/bootstrap/dist/js/bootstrap.min.js',

//css
	'node_modules/bootstrap/dist/css/bootstrap.min.css',
];

// Static Server + watching scss/html files
gulp.task('serve', function() {

	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	gulp.watch("./scss/**/*.scss", ['sass']);
	gulp.watch("./scss_bootstrap/**/*.scss", ['sassBootstrap']);

	//js and HTML files to reload on save
	gulp.watch([
		"./*.html",
		"js/*.js",
		]).on('change', browserSync.reload);
});

// Compile sass for production - no swithcer styles, no sourcemaps
gulp.task('sass', function() {
	return gulp.src("./scss/**/*.scss")
		.pipe(sourcemaps.init())
		.pipe(header('$switcher: false;\n'))
		// outputStyle
		// Type: String Default: nested Values: nested, expanded, compact, compressed
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(postcss([ autoprefixer({
			"browsers": [
				"> 0.1%"
			]
		}), flexbugs(), stylefmt(
			{
				"extends": "stylelint-config-suitcss",
				"rules": {
					"indentation": "tab",
					"number-leading-zero": null
				}
			}
		)]))
		.pipe(sourcemaps.write('../css/maps'))
		.pipe(gulp.dest("./css"))
		.pipe(browserSync.stream({match: '**/*.css'}));
});

// Compile Bootstrap sass for production
gulp.task('sassBootstrap', function() {
	return gulp.src("./scss_bootstrap/**/*.scss")
		// outputStyle
		// Type: String Default: nested Values: nested, expanded, compact, compressed
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(postcss([ autoprefixer({
			"browsers": [
				"> 0.1%"
			]
		}), flexbugs(), stylefmt(
			{
				"extends": "stylelint-config-suitcss",
				"rules": {
					"indentation": "tab",
					"number-leading-zero": null
				}
			}
		)]))
		.pipe(gulp.dest("./css"))
		.pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('default', ['serve']);

// JS task - running manually - concat, strip debugging and minify
gulp.task('scripts', function() {
	gulp.src(scripts)
	.pipe(uglify({
		output: {
			comments: "/^!|opyright/"
		}
	}))
	.pipe(concat('compressed.js'))
	.pipe(gulp.dest('js/'));
});
