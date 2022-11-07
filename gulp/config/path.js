// Получаем имя папки проэкта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist',
      srcFolder = './src';

export const path = {
  build: {
    files: `${buildFolder}/files/`,
    html:  `${buildFolder}/`,
    scss:  `${buildFolder}/css/`,
    js:    `${buildFolder}/js/`,
    images:`${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
  },

  src: {
    files: `${srcFolder}/files/**/*.*`,
    html:  `${srcFolder}/*.html`,
    scss:  `${srcFolder}/+(sass|scss)/*.+(scss|sass)`,
    js:    `${srcFolder}/js/*.js`,
    images:`${srcFolder}/img/**/*.{jpg,jpeg,gif,png,webp}`,
    svg:   `${srcFolder}/img/**/*.svg`,
    fonts: `${srcFolder}/fonts/**/*.*`,
  },

  watch: {
    files: `${srcFolder}/files/**/*.*`,
    html:  `${srcFolder}/**/*.html`,
    scss:  `${srcFolder}/+(sass|scss)/**/*.+(scss|sass|css)`,
    js:    `${srcFolder}/js/**/*.js`,
    images:`${srcFolder}/img/**/*.{jpg,jpeg,gif,png,ico,svg,webp}`,
    fonts: `${srcFolder}/fonts/**/*.*`,
  },

  clean: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: '',
};