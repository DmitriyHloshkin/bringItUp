export const copyFonts = () => {
  const { gulp, path} = global.app;

  return gulp.src(path.src.fonts)
            .pipe(gulp.dest(path.build.fonts));          
};