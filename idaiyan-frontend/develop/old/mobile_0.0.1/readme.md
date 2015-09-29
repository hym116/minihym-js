Front-end of iDaiYan.
================================

基于fis的前端开发框架，支持amd模式，less

## 安装使用

```
npm install -g fis
```

安装插件

```
npm install fis-postprocessor-amd -g
npm install fis-postpackager-autoload -g
npm install fis-packager-depscombine -g
npm install fis-parser-less -g
npm install fis-postpackager-simple -g
```


进入 front-end 目录 编译 & 运行

```
// 开起打包编译
fis release -p
fis server start
```

fis release 常用参数

```
// 合并
fis release -p
// 压缩
fis release -o
// md5戳
fis release -m
// 监听修改
fis release -w
// 实时刷新
fis release -L
```

fis release 多参数使用

```
// 压缩 & md5戳 & 合并
fis release -omp
// 监听修改 & 实时刷新
fis release -wL
// 全套服务
fis release -ompwL
```


fis release的使用[http://fis.baidu.com/docs/api/cli.html](http://fis.baidu.com/docs/api/cli.html)
================================


三种语言能力[http://fis.baidu.com/docs/more/fis-standard.html](http://fis.baidu.com/docs/more/fis-standard.html)
================================