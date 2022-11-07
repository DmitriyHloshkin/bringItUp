export function webpackConfig(isDev) {
  return {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? "source-map" : false,
    output: {
      filename: 'app.min.js',
    },

    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            "presets": [['@babel/preset-env', {
                'debug': true,
                'corejs': 3,
                'useBuiltIns': 'usage'
            }]]
          }
        }
      }]
    }
  };
}