const gulp = require('gulp');
const scss = require('gulp-sass');
const minifyCSS = require('gulp-minify-css');
const rename = require('gulp-rename');

gulp.task('scss',function(){
    return gulp.src('stylesheet/index.scss')
    .pipe(scss())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCSS())
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
})

gulp.task('scssAll',function(){
    return gulp.src('stylesheet/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
})

gulp.task('scripts',function(){
    return gulp.src(['*.js','!gulpfile.js'])
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
})

gulp.task('copy-html',function(){
    return gulp.src('*.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
})

gulp.task('data',function(){
    return gulp.src(['*.json','!package.json'])
    .pipe(gulp.dest('dist/data'))
    .pipe(connect.reload());
})

gulp.task('images',function(){
    return gulp.src('images/**/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload());
})

gulp.task('build',['scss','scripts','copy-html','data','scssAll','images'],function(){
    console.log('项目建立成功');
})

gulp.task('watch',function(){
    gulp.watch('stylesheet/index.scss',['scss']);
    gulp.watch('stylesheet/*.scss',['scssAll']);
    gulp.watch(['*.js','!gulpfile.js'],['scripts']);
    gulp.watch('*.html',['copy-html']);
    gulp.watch(['*.json','!package.json'],['data']);
    gulp.watch('images/**/*',['images']);
})

const connect = require('gulp-connect');

gulp.task('server',function(){
    connect.server({
        root: 'dist',
        port: 4399,
        livereload: true
    })
})

gulp.task('default',['watch','server']);










