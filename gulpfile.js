global.$ = {
    gulp: require('gulp'),
    plugins: require('gulp-load-plugins')(), // плагин, позволяющий не прописывать каждый плагин как переменную
    bs: require('browser-sync').create(), // онлайн-сервер

    path: {
        tasks: require('./gulp/config/tasks.js') // путь к конфигу, где прописаны в котором собран массив из путей к задачам галпа
    }
};

$.path.tasks.forEach((taskPath) => {
    require(taskPath)(); // собираем задачи
});

$.gulp.task('default', $.gulp.parallel('html', 'styles', 'scripts', 'server')); // команда по умолчанию