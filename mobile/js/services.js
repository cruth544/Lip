app
  .factory('Video', ['$http', 'Upload', VideoService])
  .factory('Session', SessionService)

function VideoService($http, Upload) {
  var service = {}

  service.video = null
  service.songs = [
    {name: 'This Love',
      owner: 'Maroon 5',
      users: 'Songs About Jane',
      snippets: '3:26',
      songUrl: '../assets/02 This Love.m4a'},
    {name: 'I\'m on a Boat',
      owner: 'Lonely Island',
      users: 'Incredibad',
      snippets: '2:36',
      songUrl: '../assets/04 I\'m On A Boat (feat. T-Pain).mp3'},
    {name: 'I Just Had Sex',
      owner: 'Lonely Island',
      users: 'Incredibad',
      snippets: '2:47',
      songUrl: '../assets/03-the_lonely_island-i_just_had_sex_(feat._akon).mp3'},
  ]
  service.song = {
    name     : null,
    owner    : null,
    songUrl  : null,
    users    : null,
    snippets : null,
    songFile : null
  }

  service.friendsList
  // $http.get()

  service.upload = function (snippet, song) {
    var time = new Date()
    var name = time.getUTCFullYear() +'-'+ (time.getUTCMonth() + 1) +'-'+ time.getUTCDate() + '_'
    name += time.getUTCHours().toFixed(2) +':'+ time.getUTCMinutes().toFixed(2) +':'+ time.getUTCSeconds().toFixed(2)
    //name += '_' + User.name
    // return console.log(snippet, song)

    // upload
    console.log("UPLOADING!!!\n")
    console.log(song)
    Upload.upload({
      url: 'http://localhost:8888/song',
      data: {video: snippet, audio: song, fileName: name, owner: 'The Maker', newSongName: song ? song.name : null}
    }).then(function (resp) {
      console.log('Success ' + resp/*.config.data.file.name*/ + 'uploaded. Response: ' + resp.data);
    }, function (resp) {
      console.log('Error status: ' + resp.status);
    }, function (evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt);
    })
  }

  return service
}

function SessionService() {
  var service = {}


  return service
}



