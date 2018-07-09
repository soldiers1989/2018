
# 出现问题，如果是手打的，就重做复制粘贴，如果是复制粘贴，就手打，如果还是有问题，就尝试注销重启。
# shift+ctrl+F   格式化
# Tab   补全
# 字符串不允许换行



# https://bower.io/ 
- 包管理工具，建议使用NPM


# http://www.gulpjs.com.cn/ 
- 自动化构建工具增强你的工作流程！


## gulp中常用的插件：
    gulp-less -https://www.npmjs.com/package/gulp-less
    gulp-cssnano -https://www.npmjs.com/package/gulp-cssnano

    browser-sync -http://www.browsersync.cn/




# 注意！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
1. 安装 node 
    - http://nodejs.cn/
    - https://nodejs.org/en/

    配置环境变量：
    + 在系统变量新建  变量名为： NODE_HOME ，变量值为：C:\Program Files\nodejs\
    + 查看配置是否成功：cmd 打开命令行窗口。输入path, node 

2. 使用 npm （包管理工具）
    -不需要安装，安装 node环境时就自带npm 

#  设置npm的镜像源为淘宝镜像。后面的就可以使用npm，速度会变快，因为源地址改为了cnpm 
    - $ npm config set registry http://registry.npm.taobao.org


    + 安装一个包（命令行中进入工程所在的顶层目录）
        + 初始化配置文件：npm init --yes
        + 安装需要的包： npm install jquery --save   (在当前目录下添加一个node_modules 目录)
            --save 保存到当前目录下， -g 全局安装。
            注：包安装成功后会在package.json文件中添加依赖配置。

        + 卸载包： npm uninstall jquery 


# 全局安装后，打typings等代码，如果有出现提示版本号，就可以不用重复装，再打一次也可以，会更新到最新版本。

3. 使用vscode文件编辑工具创建工程。
    -https://code.visualstudio.com/

    + js代码提示：typings
    - 安装： install typings -global
    - 查看版本信息：typings -v
    - 安装提示相关文件：
        + typings install dt~jquery --global --save
    - 在需要提示的js文件中开头加入以下代码（注意修改 path 中的路径）
        /// <reference path="../../ts/typings/globals/jquery/index.d.ts" />




## 自动化构建工具。
    - http://www.gulpjs.com.cn/
    1. 全局安装gulp: npm install --global gulp
    2. 作为项目开发依赖安装  npm install --save-dev gulp
    3. 在项目根目录下创建 gulpfile.js 文件
    4. 编写 自动化任务 。
        // 加载 gulp模块
        var gulp = require('gulp');

        // 创建 任务
        gulp.task('default', function() {
        console.log('这是你的任务');
        });
    5. 执行自动化任务： (将命令行切换到gulpfile.js所在路径)
        gulp     执行名称为 default 的任务。
        gulp taskName   执行给定名称的任务。


### gulp 所要用到的插件。
    1. gulp-less -https://www.npmjs.com/package/gulp-less
    安装 ： npm install gulp-less
        在任务中添加以下代码：

            gulp.src('./less/**/*.less')
            .pipe(less())
            .pipe(gulp.dest('./public/css'));

      例如
      gulp.task('mystyle', function() {
           gulp.src('./less/**/*.less')   .less文件的目录
               .pipe(less())
               .pipe(gulp.dest('./public/css'));   输出css文件的目录

        });




    2. gulp-cssnano -https://www.npmjs.com/package/gulp-cssnano
    安装： npm install gulp-cssnano --save-dev
        在任务中添加以下代码：
            gulp.src('./main.css')
            .pipe(cssnano())
            .pipe(gulp.dest('./out'));



    3. browser-sync -http://www.browsersync.cn/
    安装： npm install browser-sync gulp --save-dev
    在gulpfile.js中添加以下任务：

        var browserSync = require('browser-sync').create();
        // 静态服务器
        gulp.task('browser-sync', function() {
            browserSync.init({
                server: {
                    baseDir: "./" //当前作目录作为根目录。
                }
            });
        });

        执行任务： gulp browser-sync 

        浏览器中会自动打下： localhost:3000
        我们也可以手动打开： localhost:3001 图形终端管理服务




































