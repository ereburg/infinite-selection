module.exports = function () {
    // $.gulp.task('scripts-libs', () => {
    //     return $.gulp.src([ // Берем все необходимые библиотеки
    //         './app/scripts/libs/**/*.js'
    //         ])
    //         .pipe($.plugins.sourcemaps.init())
    //         .pipe($.plugins.concat('libs.min.js')) // Собираем их в кучу в новом файле
    //         .pipe($.plugins.terser()) // Сжимаем JS файл
    //         .pipe($.plugins.sourcemaps.write('./')) 
    //         .pipe($.gulp.dest('./build/scripts'));
    // });
    $.gulp.task('scripts', () => {
        return $.gulp.src(['./app/scripts/main.js'])
            .pipe($.plugins.sourcemaps.init())
            .pipe($.plugins.rename({ suffix: '.min' }))
            .pipe($.plugins.terser()) // Сжимаем JS файл
            .pipe($.plugins.sourcemaps.write('./')) 
            .pipe($.gulp.dest('./build/scripts'));
    });
    // $.gulp.task('scripts', $.gulp.series('scripts-libs', 'scripts-main'));
};