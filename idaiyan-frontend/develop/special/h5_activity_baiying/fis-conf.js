//后缀名的less的文件使用fis-parser-less编译
//modules.parser.less表示设置后缀名为less的文件的parser，第二个less表示使用fis-parser-less进行编译
fis.config.set('modules.parser.less', 'less');
//将less文件编译为css
fis.config.set('roadmap.ext.less', 'css');

fis.config.set('roadmap.domain', 'http://static.idaiyan.cn/special/h5_activity_baiying');

fis.config.set('roadmap.path', [
    {
        reg: /\/_[^\/]*?$/i,
        release: false
    },
    {
        reg: /^\/css\/(.*\..+)$/i,
        release: '\/css\/$1'
    },
    {
        reg: /^\/audio\/(.*\..+)$/i,
        release: '\/audio\/$1'
    },
    {
        reg : /readme.md|fis-conf.js/,
        //编译的时候不要产出了
        release : false
    }
]);