


# 软件下载
    https://nodejs.org/en/
    http://nodejs.cn/
# 软件安装
    ...
# 环境变量配置:
    如果是新版本的 node 用户不需要配置，在安装会自动的配置环境变量。
    如果是较旧的版本需要自行配置环境变量：
    1. 新建环境变量： NODE_HOME      C:\Program Files\nodejs\
    2. 将 %NODE_HOME%  添加到 path 中。
    3. 在path 环境变量中添加 C:\Users\Administrator\AppData\Roaming\npm

检查 node 安装版本：
    打开命令行：
        $ node --version
        $ node -v 
        $ npm --version
        $ npm -v

npm 包管理器,是全球最大的开源库生态系统。
    https://www.npmjs.com

## 解决 npm 国内下载慢的问题
    
    1. $ npm install -g cnpm --registry=https://registry.npm.taobao.org

       cnpm

    2. 将npm 镜像设置为淘宝镜像
        $ npm config set registry http://registry.npm.taobao.org 

dos命令：
    $ dir -查看当前所在目录的文件和文件夹
    $ cd  -进入特定的目录
    $ cls -清屏
    $ d: -切换到盘。
    tab 键  -补全。

    $ ping -t 向目标发送数据包并接收返回。
    $ ipconfig 查看网络配置信息。
    $ set 设置或检查环境变量参数
    $ path 查看环境变量

PowerShell 命令：
    $ ls -查看当前所在目录的文件和文件夹
    $ cd  -进入特定的目录
    $ clear -清屏
    $ d: -切换到盘。
    $ pwd 显示工作路径 







REPL 环境
    在命令行中执行
    1. $ node 命令就可以进行REPL
    在 REPL 环境下就可以写JS代码。
    2. $ .exit 退出 REPL

# IDE工具：
    https://code.visualstudio.com/




typings 
$ npm install typings --global 全局安装typings
$ typings install dt~node --global --save  安装node相关的提示文件




字符画制作：http://www.degraeve.com/img2txt.php



# node 调试：
1. REPL 环境下调试
    node debug xxxx.js
    
    help 获取帮助信息
    n 下一步
    watch 监视表达的运行
2. 使用 vscode 调试
    2.1 点击调试图标
    2.2 配置 launch.json 文件
        "program": "${workspaceRoot}/src/js/5.调试.js",
    2.3 




   
