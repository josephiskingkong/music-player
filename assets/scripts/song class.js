export class Song {
    constructor(title, artist, url) {
      this.title = title;
      this.artist = artist;
      this.url = url;
      this.audio = new Audio(url);
      this.isPlaying = false;
      this.isPaused = false;
    }
  
    play() {
      if (!this.isPlaying) {
        this.audio.play();
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
    return new Song (title, artist, url);
}

export function createDecoratedSong(Class, props) {
    class DecoratedClass extends Class {
        constructor(...args) {
            super(...args);
            Object.assign(this, props);
        }
    }
    return DecoratedClass;
}