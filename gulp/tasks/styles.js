module.exports = function () {
    $.gulp.task('styles', () => {
        return $.gulp.src('./app/scss/style.scss')
            .pipe($.plugins.sourcemaps.init())
            .pipe($.plugins.sass({
                errorLogToConsole: true, 
                outputStyle: "compressed"
            }))
            .on('error', console.error.bind(console))
            .pipe($.plugins.purgecss({
                content: ['./build/**/*.html'],
                whitelistPatterns: [/scroll/, /hide/, /active/, /hidden/, /added/]
            })) 
            .pipe($.plugins.autoprefixer({
                cascade: true
            })) 
            .pipe($.plugins.csso()) 
            .pipe($.plugins.rename({ suffix: '.min' })) 
            .pipe($.plugins.sourcemaps.write('./')) 
            .pipe($.gulp.dest('./build/styles')) 
            .pipe($.bs.stream());
    });
};
