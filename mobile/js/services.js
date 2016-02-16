app
  .factory('Video', VideoService)

function VideoService() {
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

  return service
}
