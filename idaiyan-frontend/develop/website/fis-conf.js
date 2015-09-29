// 开起 autuload, 好处是，依赖自动加载。
fis.config.set('modules.postpackager', 'autoload');
fis.config.set('settings.postpackager.autoload.type', 'requirejs');

// 轮训监听修改
fis.config.set('project.watch.usePolling', true);

// 设置成 amd 模式。
fis.config.set('modules.postprocessor.html', 'amd');
fis.config.set('modules.postprocessor.js', 'amd');
fis.config.set('settings.postprocessor.amd', {
    baseUrl: './js/',

    // 查看：https://github.com/amdjs/amdjs-api/blob/master/CommonConfig.md#paths-
    // 不同的是，这是编译期处理，路径请填写编译路径。
    paths: {
        apis: 'modules/apis',
        app: 'modules/app',
        pkgs: 'modules/pkgs',
        css: 'modules/css.js',
        main: 'modules/main.js',
        jquery: 'modules/libs/jquery/jquery-1.11.2.js',
        superslide: 'modules/libs/superslide/jquery.SuperSlide.2.1.1.source.js',
        validform: 'modules/libs/validform/Validform_v5.3.2.js',
        validform_datatype: 'modules/libs/validform/Validform_Datatype.js',
        fullpage: 'modules/libs/fullpage/jquery.fullPage.js',
        easings: 'modules/libs/fullpage/vendors/jquery.easings.min.js',
        parallax: 'modules/libs/parallax/jquery.parallax.js',
        arttemplate: 'modules/libs/arttemplate/arttemplate.js',
        pin: 'modules/libs/pin/jquery.pin.js',
        popup: 'modules/libs/ui/popup/popup.js',
        tip: 'modules/libs/ui/tip/tip.js',
        dropkick: 'modules/libs/ui/dropkick/dropkick.js',
        icheck: 'modules/libs/ui/icheck/icheck.js'
    },

    // 查看：https://github.com/amdjs/amdjs-api/blob/master/CommonConfig.md#packages-
    // 不同的是，这是编译期处理，路径请填写编译路径。

    packages: [

        {
            name: 'zrender',
            location: 'modules/libs/zrender',
            main: 'zrender'
        }

        // {
        //     name: 'echarts',
        //     location: 'modules/libs/echarts',
        //     main: 'echarts'
        // }
    ]

    // 设置 bootstrap 依赖 jquery
    // 更多用法见：https://github.com/amdjs/amdjs-api/blob/master/CommonConfig.md#shim-
    // key 为编译期路径。

    // shim: {
    //     'modules/libs/bootstrap/js/bootstrap.js': ['jquery']
    // }

});

// 使用 depscombine 是因为，在配置 pack 的时候，命中的文件其依赖也会打包进来。
fis.config.set('modules.packager', 'depscombine');

fis.config.set('pack', {
//     'pkg/css/jqueyr-ui.css': [
//         '/modules/libs/jquery-ui/themes/base/core.css',
//         '/modules/libs/jquery-ui/themes/base/tabs.css',
//         '/modules/libs/jquery-ui/themes/base/datepicker.css',
//         '/modules/libs/jquery-ui/themes/base/theme.css'
//     ],

    // js
    // 依赖也会自动打包进来, 且可以通过控制前后顺来来定制打包，后面的匹配结果如果已经在前面匹配过，将自动忽略。
    'pkg/zrender.js': ['js/modules/libs/zrender/zrender.js'],
    //'pkg/echarts.js': ['js/modules/libs/echarts/echarts.js'],

//     'pkg/bootstrap_jquery.js': ['modules/libs/bootstrap/js/bootstrap.js'],
//     'pkg/jquery_ui_tabs.js': ['modules/libs/jquery-ui/ui/tabs.js']
});



//后缀名的less的文件使用fis-parser-less编译
//modules.parser.less表示设置后缀名为less的文件的parser，第二个less表示使用fis-parser-less进行编译
fis.config.set('modules.parser.less', 'less');
//将less文件编译为css
fis.config.set('roadmap.ext.less', 'css');


// fis.config.set('roadmap.domain', {
//     '*.css':['http://static.idaiyan.cn/website'],
//     '*.js':['http://static.idaiyan.cn/website'],
//     'image':['http://static.idaiyan.cn/website']
// });
fis.config.set('roadmap.domain', 'http://static.idaiyan.cn/website');

fis.config.set('roadmap.path', [

    {
        reg: /\/_[^\/]*?$/i,
        release: false
    },

    // 标记 isMod 为 true, 这样，在 modules 里面的满足 commonjs 规范的 js 会自动包装成 amd js, 以至于能在浏览器中运行。
    //

    {
        reg: /^\/js\/modules\/(.*\..+)$/i,
        isMod: true,
        release: '\/static\/modules\/home\/js\/modules\/$1'
    },
    {
        reg: /^\/js\/(require\.js)$/i,
        isMod: false,
        release: '\/static\/modules\/home\/js\/$1'
    },
    {
        reg : /prefix.*/,
        release : false
    },
    {
        reg: /^\/styles\/(.*\..+)$/i,
        release: '\/static\/modules\/home\/css\/$1'
    },
    {
        reg: /^\/images\/(.*\..+)$/i,
        release: '\/static\/modules\/home\/images\/$1'
    },
    // {
    //     reg: /^\/form\/(.*\..+)$/i,
    //     release: false
    // },
    // {
    //     reg: /^(.*\.html)$/i,
    //     isHtmlLike : true,
    //     release: '\/html\/$1'
    // },
    {
        reg : /readme.md|fis-conf.js/,
        //编译的时候不要产出了
        release : false
    }
]);

//Step 1. 取消下面的注释开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
// fis.config.set('modules.postpackager', 'simple');

//通过pack设置干预自动合并结果，将公用资源合并成一个文件，更加利于页面间的共用

//Step 2. 取消下面的注释开启pack人工干预
// fis.config.set('pack', {
//     'pkg/lib.js': [
//         '/lib/mod.js',
//         '/modules/underscore/**.js',
//         '/modules/backbone/**.js',
//         '/modules/jquery/**.js',
//         '/modules/vendor/**.js',
//         '/modules/common/**.js'
//     ]
// });

//Step 3. 取消下面的注释可以开启simple对零散资源的自动合并
// fis.config.set('settings.postpackager.simple.autoCombine', true);


//Step 4. 取消下面的注释开启图片合并功能
// fis.config.set('roadmap.path', [{
//     reg: '**.css',
//     useSprite: true
// }]);
// fis.config.set('settings.spriter.csssprites.margin', 20);
