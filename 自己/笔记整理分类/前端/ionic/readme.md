

混合APP
    把 webapp 打包一个 Android手机安装 apk
    主： android 
    次： webapp
    把 webapp 嵌入到 android 项目当中。

    1. 要有 android 项目。
    2. webapp 
    3. 把 webapp 添加 android 项目中。
    4. 编译 android 项目 得到 xxxx.apk
    5. xxxx.apk 可以发布运行了。



ionic 框架：
    android 相关环境：
        JAVA:  http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html
        JDK: JAVA 开发工具。              先下载Android Studio，然后从那里下载JDK再拷贝下来。
        ADT:
    
环境配置：

1. 安装 node 
     $ npm config set registry http://registry.npm.taobao.org

2. 安装
    $ npm install -g cordova 
    $ npm install -g ionic

3. 安装 JDK 工具。
配置 JAVA 环境变量
    在系统变量以下变量： 
    新建： JAVA_HOME  C:\Program Files\Java\jdk1.8.0_111
    path 中添加 %JAVA_HOME%\bin

    命令行中输入： java javac java -version

解压 sdk 压缩包
    在系统变量以下变量：
    新建 ：ANDROID_HOME D:\sdk                //SDK顶层目录。
    path 中添加 %ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools

    命令行中输入 adb 命令，如果能看反应说明配置成功。
###    注意：添加变量时要用英文，path的添加要用;隔开！（ 变量中都为路径 ）



###    注意： 项目目录要在XMPP服务器下，这个环境运行需要服务器！！！
              C:\xampp\htdocs\www
###    然后会在目录下自动新建一个项目目录，  $ ionic start myapp   myapp就是项目模板，会有一个myapp目录，这个目录就是我们的项目目录。



###  下载项目模板：
    $ ionic start myapp
    当执行这个命令的时候会从github上下载工程模板。（你会看到二次下载读条）。

### 注意  会弹出一个选择Y  N  选  y





#### 打包项目：
    1. 在项目  根目录   下打下 命令行窗口。   （项目是指下载的项目模板目录    myapp）
    2. $ ionic platform add android 将项目添加到android 平台（会github下载android项目模板)
    会在项目根目录下创建 platforms\android\....   （android 目录中就是android项目）。
    3. $ ionic build android 编译android 项目
    编译完成后会在生成apk包
       /platforms/android/build/outputs/apk/android-debug.apk
    4. android apk打包完成，可以将 android-debug.apk 文件安装到手机中运行。
 






















