app
  .factory('Video', VideoService)

function VideoService() {
  console.log('SERVICE OPEN!')
  var service = {}
  service.video = null
  service.songs = [
    {name: 'Summertime Sadness',
      artist: 'Lana Del Rey',
      album: 'Born To Die',
      length: '4:24'},
    {name: 'Take on Me',
      artist: 'a-ha',
      album: 'Hunting High and Low',
      length: '3:48'},
    {name: 'Don\'t Stop Believin\'',
      artist: 'Journey',
      album: '',
      length: '4:09'},
  ]
  service.song = {
    name: null,
    artist: null,
    album: null,
    length: null
  }

  return service
}
