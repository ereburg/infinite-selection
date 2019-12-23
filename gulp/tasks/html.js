module.exports = function () {
    $.gulp.task('html', () => {
        return $.gulp.src('./app/*.html')
            .pipe($.plugins.htmlmin({
                collapseWhitespace: true
            }))
            .pipe($.gulp.dest('./build')).on('change', $.bs.reload);
    });
}; 