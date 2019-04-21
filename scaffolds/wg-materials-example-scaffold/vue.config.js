let path = require('path')
let glob = require('glob')
let fs = require('fs')

//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
    let entries = {},
        basename, tmp, pathname, appname;

    glob.sync(globPath).forEach(function(entry) {
        basename = path.basename(entry, path.extname(entry));
        console.log(entry)
        tmp = entry.split('/').splice(-3);
        console.log(tmp)
        pathname = basename; // 正确输出js和html的路径
        
        console.log(pathname)

        let basepath='src/'+tmp[0]+'/'+tmp[1];

        let templatepath='public/default.html';
        if(fs.existsSync("./"+basepath+"/index.html")){
            templatepath=basepath+"/index.html"
        }

        entries[pathname] = {
            entry:'src/'+tmp[0]+'/'+tmp[1]+'/index.js',
            template:templatepath,
            filename: pathname.toLowerCase()+'.html',
            //不进行页面压缩
            minify:false
        };
    });
    console.log(entries)
    return entries;
    
}

let vues = getEntry('./src/pages/**/*.vue');


module.exports = {
  pages:vues,	
  lintOnSave: false,
  outputDir: 'build',
  publicPath: './',
  //关闭SourceMap
  productionSourceMap: false,
  runtimeCompiler:true,
  //filenameHashing: false,
  chainWebpack: (config) => {
    
    //去除代码压缩
    config
      .optimization
      .minimize(false);
    
    //去除预加载
    config.plugins.delete('prefetch');

  }
};
