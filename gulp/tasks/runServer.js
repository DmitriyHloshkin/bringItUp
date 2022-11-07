const server = {

  serverRun: () => {
    const { plugins, path } = global.app,
          browserSynk = plugins.browserSync;
  
    return browserSynk.init({
        server: {
            baseDir: path.clean,
        },
        notify: true,
        port: 3001
    });
    
  },

  serverClose: () => {
    const { plugins } = global.app,
          browserSynk = plugins.browserSync;
  
    return browserSynk.exit();
  },

};

export const { serverRun , serverClose } = server;