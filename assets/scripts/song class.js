export class Song {
    constructor(title, artist, url) {
      this.title = title;
      this.artist = artist;
      this.url = url;
      this.audio = new Audio(url);
      this.isPlaying = false;
      this.isPaused = false;
      this.audio.loop = false
    }
  
    async play() {
      if (!this.isPlaying) {
        this.audio.play()
          .then(() => {})
          .catch(error => {
            console.log(error)
          })
        this.isPlaying = true;
        this.isPaused = false;
      }
    }
  
    pause() {
      if (!this.isPaused) {
        this.audio.pause();
        this.isPlaying = false;
        this.isPaused = true;
      }
    }
}

export function createSong(title, artist, url) {
  audio.preload = 'metadata';
    return new Song (title, artist, url);
}

export function createDecoratedSong(title, artist, url, props) {
 class DecoratedClass extends Song {
  constructor(title, artist, url) {
    super(title, artist, url)
    Object.assign(this, props)
  }

  play() {
    super.play()
  }

  pause() {
    super.pause()
  }
 }
 return new DecoratedClass(title, artist, url, props)
}