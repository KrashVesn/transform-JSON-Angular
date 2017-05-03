var gulp			= require('gulp'),
		sass			= require('gulp-sass'),
		notify		= require('gulp-notify'),
		autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gulp.dest('app/css'))
});

gulp.task('watch', ['sass'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
});