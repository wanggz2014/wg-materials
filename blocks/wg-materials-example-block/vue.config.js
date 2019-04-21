module.exports = {
  outputDir: 'build',
  publicPath: './',
  filenameHashing: false,
  chainWebpack: (config) => {
    config
      .entryPoints.clear()
      .end()
      .entry('index')
      .add('./demo/index')
      .end()
      .output
      .filename('[name].bundle.js');

    config
      .plugin('html')
      .tap((args) => {
        args[0].template = './demo/index.html';
        args[0].minify=false;
        return args;
      });

    config
      .optimization
      .minimize(false)
  },
};
