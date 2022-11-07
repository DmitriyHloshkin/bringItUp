import gulp from 'gulp';

import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    gulp: gulp,
    path: path,
    plugins: plugins,
};

// Импортируем задачи
import { copyFiles } from './gulp/tasks/copyFiles.js';
import { reset } from './gulp/tasks/reset.js';
import { copyHtml } from './gulp/tasks/copyHtml.js';
import { serverRun, serverClose } from './gulp/tasks/runServer.js';
import { copyScss } from './gulp/tasks/copyCss.js';
import { copyJs } from './gulp/tasks/copyJs.js';
import { copyImg } from './gulp/tasks/copyImg.js';
import { copyFonts } from './gulp/tasks/copyFonts.js';

// Собираем наблюдатели
function watcher() {
    gulp.watch(path.watch.files, copyFiles);
    gulp.watch(path.watch.html, copyHtml);
    gulp.watch(path.watch.scss, copyScss);
    gulp.watch(path.watch.js, copyJs);
    gulp.watch(path.watch.images, copyImg);
    gulp.watch(path.watch.fonts, copyFonts);
    
}

// Собираем паралельно выполняеме задачи
const mainTasks = gulp.parallel(copyFiles, copyHtml, copyScss, copyJs, copyImg, copyFonts);

// Режим gulp
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, serverRun), serverClose);
const build = gulp.series(reset, mainTasks);

export { dev };
export { build };

// Сценарий по умолчанию
gulp.task("default", global.app.isBuild ?  build : dev);