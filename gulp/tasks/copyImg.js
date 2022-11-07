export const copyImg = () => {
	const { gulp, path, plugins } = global.app;

	const notify = plugins.notify,
				plumber = plugins.plumber,
        browserSync = plugins.browserSync,
        gulWebp = plugins.gulWebp,
        imagmin = plugins.imagmin,
        newer = plugins.newer;

  return gulp.src(path.src.images, {sourcemaps: true})
    .pipe(plumber(
      notify.onError({
        title:'IMG',
        message: 'Error: <%= error.message %>',
      })))
    .pipe(newer(path.build.images))
    .pipe(gulWebp())
    .pipe(gulp.dest(path.build.images))
    .pipe(gulp.src(path.src.images))
    .pipe(newer(path.build.images))
    .pipe(imagmin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      interlaced: true,
      optimizationLevel: 3,
    }))
    .pipe(gulp.dest(path.build.images))
    .pipe(gulp.src(path.src.svg))
    .pipe(gulp.dest(path.build.images))
    .pipe(browserSync.stream());
};