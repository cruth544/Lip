app
  .factory('Video', ['$http', 'Upload', VideoService])
  .factory('User', UserService)

function VideoService($http, Upload) {
  var service = {}

  service.video = null
  service.songs = [
    {name: 'This Love',
      artist: 'Maroon 5',
      album: 'Songs About Jane',
      length: '3:26',
      src: '../assets/02 This Love.m4a'},
    {name: 'I\'m on a Boat',
      artist: 'Lonely Island',
      album: 'Incredibad',
      length: '2:36',
      src: '../assets/04 I\'m On A Boat (feat. T-Pain).mp3'},
    {name: 'I Just Had Sex',
      artist: 'Lonely Island',
      album: 'Incredibad',
      length: '2:47',
      src: '../assets/03-the_lonely_island-i_just_had_sex_(feat._akon).mp3'},
  ]
  service.song = {
    name: null,
    artist: null,
    album: null,
    length: null
  }

  service.friendsList
  // $http.get()

  service.upload = function (snippet) {
    var submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
    };

    // upload on file select or drop
    var upload = function (file) {
        console.log("UPLOADING!!!\n\n")
        Upload.upload({
            url: 'http://localhost:8888/song',
            data: {video: snippet, audio: 'HELLOOOOOOOO', info: Upload.jsonBlob(snippet)}
        }).then(function (resp) {
            console.log('Success ' + resp/*.config.data.file.name*/ + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    upload()

    // $http.post('http://localhost:8888/song', {video: service.video, song: service.song})

  }

  return service
}

function UserService() {
  var service = {}


  return service
}



