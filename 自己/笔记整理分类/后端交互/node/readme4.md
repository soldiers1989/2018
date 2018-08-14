
#  设置npm的镜像源为淘宝镜像。   
    - $ npm config set registry http://registry.npm.taobao.org


#  angular 中的控制器是函数，用来向视图的作用域添加额外的功能，

## $scope 作用域 ：构造angular应用的核心基础（充当数据模型)
 $scope作用域也是表达式执行的上下文。将视图与控制器交换数据的媒介。视图与控制器之间的桥梁。
 $scope 对象就是一个普通的javaScript对象。可以任意添加属性和方法。

## $rootScope 在angular中最接近全局作用域的对象。
    表达式在使用数据时会先在$scope 中查找，如果找不到那么会在$rootScope中查找。
    不建议在$rootScope上添加太多的属性和方法。


# 过滤器：  格式化数据

-  angular 语言包下载 https://github.com/angular/bower-angular-i18n



