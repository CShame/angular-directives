# textarea自动换行
实现textarea文字超过时自动换行，内容不够时textarea高度自动减小

##### 指令
auto-textarea

##### 属性
无

##### html：
```html
    <textarea ng-model='method.content' placeholder='请输入...' auto-textarea></textarea>
```


###### 说明
这是之前在网上看到的一个关于图片懒加载的指令，在github上没有找到原文的出处，自己修改并上传了，使用的时候angular.module('your module')改成你加载的模块名或者app.directive就好。