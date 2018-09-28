var gulp = require("gulp"); //yes
var plumber = require("gulp-plumber");//yes
var less = require("gulp-less");//yes
var postcss = require("gulp-postcss");//yes
var autoprefixer = require("autoprefixer");//yes
var mini = require("gulp-csso");//yes
var rename = require("gulp-rename");//yes
var imagemin = require("gulp-imagemin"); //yes
var svgstore = require("gulp-svgstore"); //yes
var posthtml = require("gulp-posthtml"); //yes
var include = require("posthtml-include"); //yes
// var htmlmin = require("gulp-htmlmin"); /*don`t use it yet*/
var removeHtmlComm = require("gulp-remove-html-comments"); //yes
var concat = require('gulp-concat'); //yes
// var uglify = require('gulp-uglify'); //yes
var uglify = require('gulp-uglify-es').default; //yes
var run = require("run-sequence"); //yes
var del = require("del"); //yes
var broSync = require("browser-sync").create();//yes

// удаление папки с билдом, для перезаписи в нее итоговых файлов
gulp.task("clean", function(){
	return del("build")
});


// копирование шрифтов, картинок из папки с ресурсами в папку билд
gulp.task("copy", function(){
	return gulp.src([
		"source/fonts/**/*.{woff,woff2,ttf,svg}",
		"source/images/**"
		// "source/js/**"
	], {
		base: "source"
	})
	.pipe(gulp.dest("build"))
});

//минифицируем изображения
gulp.task("images", function(){
	return gulp.src("build/images/*.{jpg, png, svg}")
	.pipe(imagemin([
		imagemin.optipng({optimizationLevel: 3}),
		imagemin.jpegtran({pogressive: true}),
		imagemin.svgo()
	]))
	.pipe(gulp.dest("build/images"))
});

// создание svg спрайтов, переименование и упаковка в папку билд
gulp.task("sprite", function(){
	return gulp.src("build/images/icon-*.svg")
	.pipe(svgstore({
		inlineSvg: true
	}))
	.pipe(rename("sprite.svg"))
	.pipe(gulp.dest("build/images"));
});

// относительно стилей... при работе с less файлом убираем дефолтный обработчик ошибок и ставим plumber
// учимся работать с less файлами
// добавляем в наш файл префиксы
// добавляем в папку в билд конвертированный из less в css файл
// css файл минифицируем
// минифицированный файл переименовываем  и сохраняем в билде
// используем живую перезагрузку
gulp.task("style", function(){
	return gulp.src("source/less/style.less")
	.pipe(plumber())
	.pipe(less())
	.pipe(postcss([autoprefixer()]))
	.pipe(gulp.dest("build/css"))
	.pipe(mini())
	.pipe(rename("style.min.css"))
	.pipe(gulp.dest("build/css"))
	.pipe(broSync.stream());
});


//с помощью posthtml вставляем include на страницу (чтобы вставить svg спрайты инлайн)
//удаляем комментарии в файле html
//сохраняем в билде и следим за изменениями
gulp.task("html", function(){
	return gulp.src("source/*.html")
	.pipe(posthtml([
		include()
	]))
	.pipe(removeHtmlComm())
	.pipe(gulp.dest("build"))
		.on("change", broSync.reload);
});

// собираем все файлы js в один и минифицируем
gulp.task('vendor', function() {
    // return gulp.src('source/js/*.js')
	return gulp.src(['source/js/delete-svg-style.js', 'source/js/menu.js', 'source/js/main.js'])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(uglify())
        .pipe(rename('vendor.min.js'))
        .pipe(gulp.dest('build/js'))
			.on("change", broSync.reload);
        // .on('error', gutil.log)
		// .pipe(gulp.dest("build/js"))
			// .on("change", broSync.reload);
});

//инициируем сервер из папки билд и смотрим на изменеия less и html
gulp.task("serve", function(){
	broSync.init({
		server: "build/"
	});

	gulp.watch("source/less/**/*.less", gulp.series("style"));
	gulp.watch("source/*.html", gulp.series("html"));
	gulp.watch("source/js/*.js", gulp.series("vendor"));
});

// инициируем сервер для тестирования на мобильных устройствах
gulp.task("serve-mob", function(){
	broSync.init({
		server: "build/",
		tunnel:  'asalikova'
	});
	gulp.watch("source/less/**/*.less", gulp.series("style"));
	gulp.watch("source/*.html", gulp.series("html"));
});

//стартуем! и запускаем последовательно таски

gulp.task('build', gulp.series("clean", "copy", "images", "sprite", "style", "html", "vendor", function (done) {
    done();
}));
