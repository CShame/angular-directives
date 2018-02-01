angular.module('starter.directive')
 .directive('imgStateUrl', [function () {
    return {
      restrict: 'A',
      scope:{
        imgStateUrl:"@"
      },
      link: function (scope, ele, attr) {

        //获取不到图片使用自定义默认图片
        ele.bind('error', function () {
          if(attr.imgDefault){
            attr.$set('src', attr.imgDefault);
          }
        });

        scope.$watch('imgStateUrl', function (newV, oldV) {
          if(newV){
            img.src = attr.imgStateUrl;
          }
        });

        var img = new Image();
        img.onload = function () {
          ele[0].src = attr.imgStateUrl;
        };

      }
    }
  }])
;