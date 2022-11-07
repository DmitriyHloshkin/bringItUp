export const copyScss = () => {
	const { gulp, path, plugins, isBuild, isDev } = global.app;
				
  const	notify = plugins.notify,
				plumber = plugins.plumber,
        browserSync = plugins.browserSync,
        rename = plugins.rename,
        sass = plugins.sass,
        autoprefixer = plugins.autoprefixer,
        cleanCss = plugins.cleanCss,
        webpcss = plugins.webpcss,
        cssMediaGroup = plugins.cssMediaGroup,
        ifPlugin = plugins.ifPlugin;

  return gulp.src(path.src.scss, {sourcemaps: true})
    .pipe(plumber(
      notify.onError({
        title:"SCSS",
        message: "Error: <%= error.message %>",
      })))
    .pipe(ifPlugin(isBuild, sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError)))
    .pipe(ifPlugin(isDev, sass.sync({ outputStyle: 'expanded' }).on('error', sass.logError)))
    .pipe(cssMediaGroup())
    .pipe(webpcss({
      webpClass: '.webp',
      noWebpClass: '.no-webp'
    }))
    .pipe(rename({
      dirname: "",
      basename: "style",
      prefix: "",
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(autoprefixer({
      cascade: true,
      grid: true,
      overrideBrowsersList: ['last 2 versions'],
    }))
    .pipe(ifPlugin(isBuild,cleanCss({ compatibility: 'ie8' })))
    .pipe(gulp.dest(path.build.scss))
    .pipe(browserSync.stream());
};