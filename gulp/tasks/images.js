module.exports = function () {
  $.gulp.task("tiny", () => {
    return $.gulp.src("./app/images/*.{png,jpg,jpeg}")
      .pipe($.plugins.tinypngWeb({ verbose: true }))
      .pipe($.gulp.dest("./build/images/"));
  });

  $.gulp.task("webp", () => {
    return $.gulp.src("./build/images/**/*.{png,jpg,jpeg}")
      .pipe($.plugins.webp({ quality: 80 }))
      .pipe($.gulp.dest("./build/images/"));
  });

  $.gulp.task("sprite", () => {
    return $.gulp.src("./app/images/sprite/sp-*.svg")
      .pipe($.plugins.svgstore())
      .pipe($.plugins.rename("sprite.svg"))
      .pipe($.gulp.dest("./build/images/"));
  });

  $.gulp.task("svg:remove", () => {
    return $.gulp.src("./app/images/**/*.svg")
      .pipe($.gulp.dest("./build/images/"));
  });
  $.gulp.task('images', $.gulp.series('tiny', 'webp', 'sprite', 'svg:remove'));
};