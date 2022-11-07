import del from 'del';
import fileinclude from 'gulp-file-include';
import webpHtml from 'gulp-webp-html-nosvg';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import cssMediaGroup from 'gulp-group-css-media-queries';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import gulWebp from 'gulp-webp';
import imagmin from 'gulp-imagemin';
import newer from 'gulp-newer';
import ifPlugin from 'gulp-if';
import htmlmin from 'gulp-htmlmin';

const sass = gulpSass(dartSass);

export const plugins = {
    del: del,
    fileinclude: fileinclude,
    webpHtml: webpHtml,
    plumber: plumber,
    notify: notify,
    browserSync: browserSync.create(),
    rename: rename,
    autoprefixer: autoprefixer,
    sass: sass,
    gulpSass: gulpSass,
    cleanCss: cleanCss,
    webpcss: webpcss,
    cssMediaGroup: cssMediaGroup,
    webpackStream: webpackStream,
    webpack: webpack,
    gulWebp: gulWebp,
    imagmin: imagmin,
    newer: newer,
    ifPlugin: ifPlugin,
    htmlmin: htmlmin,
};