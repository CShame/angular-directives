# 图片懒加载

##### 包括俩个指令
lazy-scroll 监听滚动条

image-lazy-src 图片加载

##### 属性
image-lazy-src:图片路径(string)

image-lazy-background-image:是否是背景图片([boolean])

image-before-load:图片加载完成之前显示的图片（[string]）

lazy-scroll-resize:调用resize()重新计算屏幕的大小([boolean])

image-lazy-loader:加载动画（ionic自带的加载动画，这里写类名就行）

##### html：
```html
<ion-content lazy-scroll>
	...
        <div  ng-repeat="f in projectList track by $index">
          <img image-lazy-src="{{f.Icon}}" image-before-load="asset/img/home/group/default-project.jpg" />
        </div>
	...
</ion-content>

```

##### js
```
$scope.projectList = [
	{Icon:'http://xxxx/1.png'},
	{Icon:'http://xxxx/2.png'},
	{Icon:'http://xxxx/3.png'},
	{Icon:'http://xxxx/4.png'},
	{Icon:'http://xxxx/5.png'},
	{Icon:'http://xxxx/6.png'},
	{Icon:'http://xxxx/7.png'},
	{Icon:'http://xxxx/8.png'},
	{Icon:'http://xxxx/9.png'},
	{Icon:'http://xxxx/10.png'}
];
```

###### 说明
这是之前在网上看到的一个关于图片懒加载的指令，在github上没有找到原文的出处，自己修改并上传了，使用的时候angular.module('your module')改成你加载的模块名就好。