export const copyFiles = () => {
  const { gulp, path} = global.app;

  return gulp.src(path.src.files)
            .pipe(gulp.dest(path.build.files));          
};