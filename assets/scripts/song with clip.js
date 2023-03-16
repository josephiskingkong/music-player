import { Song } from "./song class.js"
export class SongWithClip extends Song{
    constructor(title, artist, url, clip) {
        super(title, artist, url)
        this.clip = clip
    }

    play() {
        super.play()
    }

    pause() {
        super.pause()
    }
}