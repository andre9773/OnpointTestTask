const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sass = require('gulp-sass');

const cssFiles = [
	//'./node_modules/normalize.css/normalize.css',
	'./src/css/some.css',
	'./src/css/other.css',
	'./src/css/test.css'
];
const jsFile = [
	'./src/js/lib.js',
	'./src/js/some.js'
];
const plugins = [
    //autoprefixer({browsers: ['last 2 version']}),
   // cssnano()
];

function css() {
    return gulp.src(cssFiles)
    			//.pipe(concat('all.css'))
        		.pipe(postcss(plugins))
        		.pipe(gulp.dest('./build/css'))
        		.pipe(browserSync.stream());
}


function scripts() {
	return gulp.src(jsFile)
				.pipe(concat('all.js'))
				.pipe(uglify({
					toplevel: true
				}))
				.pipe(gulp.dest('./build/js'))
				.pipe(browserSync.stream());
}

function sassCss() {
	return gulp.src('./src/css/sass/**/*.sass')
    			.pipe(sass().on('error', sass.logError))
    			.pipe(gulp.dest('./src/css'));
}

function clean() {
	return del(['build/*']);
}

function watch() {
	browserSync.init({
        server: {
            baseDir: "./"
        },
        tunnel: true
    });
	gulp.watch('./src/css/**/*.css', css);
	gulp.watch('./src/js/**/*.js', scripts);
	gulp.watch('./src/css/**/*.sass', sassCss);
	gulp.watch('./*.html', browserSync.reload);
}

gulp.task('css', css);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('clean', clean);
gulp.task('build', gulp.series(clean,
					gulp.parallel(css, scripts)
					));

gulp.task('dev', gulp.series('build', 'watch'));