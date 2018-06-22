/**
 * Created by ws on 2018/3/12.
 */
angular.module('starter.directive')
  .directive('voiceItems', ['$interval', '$timeout', 'fsUtil', function ($interval, $timeout, fsUtil) {

    return {
      restrict: 'E',
      templateUrl: 'src/BPM/directives/voiceItems/page.html',
      scope: {
        voiceList: '=',
        canDelete: '@',
        voiceUrl: '@',
        voiceTime: '@',
        deleteHandler: '&'
      },
      link: function (scope) {

        var voiceInterval;
        var mediaRec;
        if (!scope.voiceUrl) {
          scope.voiceUrl = 'Url';
        }
        if (!scope.voiceTime) {
          scope.voiceTime = 'Mins';
        }

        initRecord();

        function initRecord() {
          scope.$watch('voiceList', function (newV, oldV) {
            if (newV && newV.length > 0) {
              scope.voiceList.forEach(function (each) {
                each.eachVoiceWidth = {width: 55 + each[scope.voiceTime] * 5 + 'px'}
              })
            }
          });
        }

        /**
         * 播放本条语音的动画
         * */
        scope.playVoice = function (data, index) {
          if (voiceInterval) {
            $interval.cancel(voiceInterval);
          }
          //停止其它语音
          for (var j = 0; j < scope.voiceList.length; j++) {
            scope.voiceList[j].haoroomsStyle = {"background-position": "0px 0px"};
          }
          //播放本条语音
          var i = 0;
          var divParent = document.getElementById("divParent" + index);
          voiceInterval = $interval(frameAnmi, 300);

          function frameAnmi() {
            if (i > 4) {
              i = 0;
            }
            data.haoroomsStyle = {"background-position": "-" + i * 20 + "px 0px"};
            i++;
          }

          playThisVoice(data[scope.voiceUrl]);
          // //语音播放完之后动画停止
          $timeout(function () {
            if (voiceInterval) {
              $interval.cancel(voiceInterval);
            }
            data.haoroomsStyle = {"background-position": "0px 0px"};
          }, data[scope.voiceTime] * 1000);
        };

        /**
         * 播放音频文件
         * */
        function playThisVoice(src) {
          if (mediaRec) {
            mediaRec.stop();
            mediaRec.release();
          }
          mediaRec = new Media(src,
            // success callback
            function () {
              console.log("recordAudio():Audio Success");
            },
            // error callback
            function (err) {
              console.log("recordAudio():Audio Error: " + err.code);
            });
          mediaRec.play();
        }

        /**
         * 删除本条语音
         * */
        scope.deleteRecord = function (data, index) {
          scope.voiceList.splice(index, 1);
          if (scope.deleteHandler) {   //回调处理
            scope.deleteHandler({file: data[scope.voiceUrl]});
          } else {    //本地文件
            fsUtil.deleteFile(data[scope.voiceUrl]);
          }
        };

      }
    }

  }]);
