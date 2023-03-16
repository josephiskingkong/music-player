import { Song } from "./song class.js"
export class SongWithText extends Song{
    constructor(title, artist, url, text) {
        super(title, artist, url)
        this.text = text
    }

    play() {
        super.play()
    }

    pause() {
        super.pause()
    }
}