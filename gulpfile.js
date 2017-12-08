'use strict';
var gulp = require("gulp"); // gulp 实例
var browserSync = require("browser-sync").create(); // 创建 browserSync 实例
var sass = require("gulp-sass"); // gulp sass 实例

// gulp 的 task 事务 html，命令行执行方法： gulp html
gulp.task("html", function(){
    return gulp.src("src/**/*.html")
    .pipe(gulp.dest("www"));
});

gulp.task("viewjs", function(){
    return gulp.src("src/views/**/*.js")
    .pipe(gulp.dest("www/views"));
});

gulp.task("ionic", function(){
    return gulp.src("src/lib/ionic/**/*.*")
    .pipe(gulp.dest("www/lib/ionic"));
});

gulp.task("css", function(){
    return gulp.src("src/lib/css/**/*.css")
    .pipe(gulp.dest("www/lib/css"));
});

gulp.task("img", function(){
    return gulp.src(['src/img/**/*.png', 'src/img/**/*.jpg', 'src/img/**/*.gif'])
    .pipe(gulp.dest("www/img"));
});

gulp.task("js", function(){
    return gulp.src("src/lib/js/**/*.js")
    .pipe(gulp.dest("www/lib/js"));
});

gulp.task("sass", function(){
    return gulp.src("src/scss/**/*.scss")
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({ outputStyle: "nested" })) // nested, expanded, compact, compressed
    .pipe(gulp.dest("www/lib/css"))
    .pipe(browserSync.stream());
});

gulp.task("serve", function(){
    browserSync.init({
        server: {
            baseDir: "./www"
        }
    });
    // gulp.watch(触发变化条件的位置, [执行的事务])
    gulp.watch("src/**/*.html", ['html']);
    gulp.watch("src/lib/css/**/*.css", ['css']);
    gulp.watch("src/img/*.png", ['img']);
    gulp.watch("src/views/**/*.js", ['viewjs']);
    gulp.watch("src/lib/js/**/*.js", ['js']);
    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch("www/**/*.*").on("change", function(){
        browserSync.reload();
    });
});

gulp.task("default", ["ionic", "html", "viewjs", "css", "img", "js", "sass", "serve"]);