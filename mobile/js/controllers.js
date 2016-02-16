app
.controller('SongCtrl',
  ['$scope', '$http', '$state', '$stateParams', '$rootScope', 'Video',
  function ($scope, $http, $state, $stateParams, $rootScope, Video) {
    $scope.back = $rootScope.back
    $scope.variable = "hello"
    $scope.songList = Video.songs
    $scope.songSelect = function (song) {
      Video.song = song
      $state.go('record')
    }
}])
.controller('FriendsCtrl',
  ['$scope', '$http', '$state', '$stateParams', '$rootScope', 'Video',
  function($scope, $http, $state, $stateParams, $rootScope, Video){
    $scope.back = $rootScope.back
    if (!Video.video) $scope.back()
    console.log("Service: ", Video.video)

}])
.controller('CameraCtrl',
  ['$scope', '$state', '$stateParams', '$rootScope', 'Video',
  function($scope, $state, $stateParams, $rootScope, Video){

///////////////////////////////INIT SCOPE///////////////////////////////
    $scope.back = $rootScope.back
    $scope.song = Video.song

////////////////////////////INIT VARIABLES//////////////////////////////
    var backButton    = document.getElementById('back-button')
    var cancelButton  = document.getElementById('cancel-button')
    var recordButton  = document.getElementById('camera-button')
    var nextButton    = document.getElementById('next-button')

    var recording = false
    var windowSize = {
      height: document.body.clientHeight || window.innerHeight,
      width: document.body.clientWidth || window.innerWidth
    }
    var cameraPreview = document.getElementById('camera-preview')
    var songPreview = document.getElementById('song-preview')
    var videoOptions = {
      audio: true,
      video: {
        width: {ideal: windowSize.width, max: 1080},
        height: {ideal: windowSize.height, max: 1920},
        facingMode: 'user'
      }
    }
    if (Video.song) {
      songPreview.src = Video.song.src
      songPreview.load()
    }


    // used camera variables
    var mediaRecorder, recordedBlobs, recordTimer, songRepeat

////////////////////////////MEDIA FUNCTIONS/////////////////////////////
    function successCallback(stream) {
      console.log('getUserMedia() got stream: ', stream);
      window.stream = stream;
      if (window.URL) {
        cameraPreview.src = window.URL.createObjectURL(stream);
      } else {
        gumVideo.src = stream;
      }
    }
    function errorCallback(error) {
      console.log('navigator.getUserMedia error: ', error);
    }
    function handleSourceOpen(event) {
      // console.log('MediaSource opened');
      sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
      // console.log('Source buffer: ', sourceBuffer);
    }

    function handleDataAvailable(event) {
      if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
      }
    }

    function handleStop(event) {
      // console.log('Recorder stopped: ', event);
    }

    function play() {
      var superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
      songPreview.currentTime = songPreview.startTime
      cameraPreview.src = window.URL.createObjectURL(superBuffer);
      songPreview.play()
      recordButton.style.display = 'none'
      nextButton.style.display = 'inline';
      (function loopAudio() {
        console.log("looping...")
        if (songPreview.currentTime >= songPreview.endTime) {
          songPreview.currentTime = songPreview.startTime
        }
        songRepeat = window.requestAnimationFrame(loopAudio)
      })()
      // save(true)
    }
    // if i need to download
    function save(downloadToDisk) {
      console.log('saving...')
      window.cancelAnimationFrame(songRepeat)
      var blob = new Blob(recordedBlobs, {type: 'video/webm'})
      if (!downloadToDisk) {
        Video.video = {
          blob: blob,
          audio: {
            startTime: songPreview.startTime,
            endTime: songPreview.endTime
          }
        }
      } else {
        var url = window.URL.createObjectURL(blob)
        var a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = 'test.webm'
        document.body.appendChild(a)
        a.click()
        setTimeout(function() {
          document.body.removeChid(a)
          window.URL.revokeObjectURL(url)
        }, 100)
      }
    }

////////////////////////////RECORD FUNCTIONS////////////////////////////
    $scope.toggleRecording = function() {
      if (!recording) {
        $scope.startRecording()
      } else {
        $scope.stopRecording()
      }
    }

    $scope.cancel = function () {
      if (recording) {
        $scope.stopRecording()
      }
      window.cancelAnimationFrame(songRepeat)
      backButton.style.display = 'block'
      recordButton.style.display = 'block'
      cancelButton.style.display = 'none'
      nextButton.style.display = 'none'
      if (window.URL) {
        cameraPreview.src = window.URL.createObjectURL(window.stream);
      } else {
        gumVideo.src = window.stream;
      }
    }

    $scope.startRecording = function() {
      recording = true
      var options = {mimeType: 'video/webm'}
      backButton.style.display = 'none'
      cancelButton.style.display = 'block'
      recordedBlobs = []
      try {
        mediaRecorder = new MediaRecorder(window.stream, options);
        recordTimer = setTimeout($scope.stopRecording, 10000)
      } catch (e0) {
        console.log('Unable to create MediaRecorder with options Object: ', e0);
        try {
          options = {mimeType: 'video/webm,codecs=vp9'};
          mediaRecorder = new MediaRecorder(window.stream, options);
          recordTimer = setTimeout($scope.stopRecording, 10000)
        } catch (e1) {
          console.log('Unable to create MediaRecorder with options Object: ', e1);
          try {
            options = 'video/vp8'; // Chrome 47
            mediaRecorder = new MediaRecorder(window.stream, options);
            recordTimer = setTimeout($scope.stopRecording, 10000)
          } catch (e2) {
            alert('MediaRecorder is not supported by this browser.\n\n' +
                'Try Firefox 29 or later, or Chrome 47 or later, with Enable experimental Web Platform features enabled from chrome://flags.');
            console.error('Exception while creating MediaRecorder:', e2);
            return;
          }
        }
      }
      // console.log('Created MediaRecorder', mediaRecorder, 'with options', options)
      mediaRecorder.onstop = handleStop;
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start(10); // collect 10ms of data
      songPreview.startTime = songPreview.currentTime
      if (songPreview.paused) {
        songPreview.play()
      }
      // console.log('MediaRecorder started', mediaRecorder);
    }

    $scope.stopRecording = function () {
      clearTimeout(recordTimer)
      window.cancelAnimationFrame(songRepeat)
      if (recording) {
        mediaRecorder.stop();
        songPreview.pause()
        songPreview.endTime = songPreview.currentTime
        recording = false
        console.log('Recorded Blobs: ', recordedBlobs);
        play()
      }
    }

    $scope.next = function () {
      save()
      $state.go('friends')
    }
/////////////////////////////START CAMERA///////////////////////////////

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

    navigator.getUserMedia(videoOptions, successCallback, errorCallback)
}])



















