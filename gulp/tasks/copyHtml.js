export const copyHtml = () => {
	const { gulp, path, plugins, isBuild, isDev } = global.app;

	const fileinclude = plugins.fileinclude,
				webpHtml = plugins.webpHtml,
				notify = plugins.notify,
				plumber = plugins.plumber,
        browserSync = plugins.browserSync,
        ifPlugin = plugins.ifPlugin,
        htmlmin = plugins.htmlmin;

  return gulp.src(path.src.html, {sourcemaps: true})
    .pipe(plumber(
      notify.onError({
        title:'HTML',
        message: 'Error: <%= error.message %>',
      })))
    .pipe(fileinclude())
    .pipe(webpHtml())
    .pipe(ifPlugin(isBuild, htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());
};