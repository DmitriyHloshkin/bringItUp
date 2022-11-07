import { webpackConfig } from '../../webpack.config.js';

export const copyJs = () => {
	const { gulp, path, plugins, isBuild, isDev  } = global.app;
  
	const notify = plugins.notify,
				plumber = plugins.plumber,
        browserSync = plugins.browserSync,
        webpack = plugins.webpackStream,
        ifPlugin = plugins.ifPlugin,
        babel = plugins.babel;

  return gulp.src(path.src.js, {sourcemaps: true})
    .pipe(plumber(
      notify.onError({
        title:'JS',
        message: 'Error: <%= error.message %>',
      })))
    .pipe(webpack(webpackConfig(isDev)))
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());
};