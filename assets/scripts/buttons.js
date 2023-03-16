import { ObjectPool } from './object pool.js';
import { Song, createSong, createDecoratedSong } from './song class.js';
import { SongWithClip } from './song with clip.js';
import { SongWithText } from './song with text.js';

const playButton = document.getElementById('play-button')
const pauseButton = document.getElementById('pause-button')
const shuffleButton = document.getElementById('shuffle-button')
const replayButton = document.getElementById('replay-button')
const trackListMenu = document.getElementById('tracklist')
const trackListButton = document.getElementById('track-list-button')
const mobileMenu = document.getElementById('mobile-menu')
const mobileMenuHeader = document.getElementById('mobile-menu-header')
const trackBar = document.getElementById('track-bar')
const volumeBar = document.getElementById('volume-bar')
const mobileVolumeBar = document.getElementById('mobile-volume-bar')

const bareSongsPool = new ObjectPool(5, createSong);
const magnolia = bareSongsPool.getObject("Magnolia", "Playboy Carti", '.\\assets\\tracks\\Playboi_Carti_Magnolia.mp3')

function changeButtons() {
    playButton.classList.toggle('hidden')
    pauseButton.classList.toggle('hidden')
}

function toStatic() {
    playButton.classList.toggle('static')
}

playButton.onclick = function() {
    magnolia.play()
    changeButtons()
}
pauseButton.onclick = function() {
    magnolia.pause()
    changeButtons()
}

trackBar.addEventListener('input', () => {
    const seekTime = magnolia.audio.duration * (trackBar.value / 100)
    magnolia.audio.currentTime = seekTime
})

magnolia.audio.addEventListener('timeupdate', () => {
    const currentTime = magnolia.audio.currentTime
    const duration = magnolia.audio.duration
    const progress = (currentTime / duration) * 100
    trackBar.value = progress
})

volumeBar.addEventListener('input', () => {
    magnolia.audio.volume = volumeBar.value
})

magnolia.audio.addEventListener('volumechange', () => {
    volumeBar.value = magnolia.audio.volume 
})

mobileVolumeBar.addEventListener('input', () => {
    magnolia.audio.volume = mobileVolumeBar.value
})

magnolia.audio.addEventListener('volumechange', () => {
    mobileVolumeBar.value = magnolia.audio.volume 
})

replayButton.onclick = function () {
    replayButton.classList.toggle('static-replay')
    magnolia.audio.loop = true
}
shuffleButton.onclick = function () {
    shuffleButton.classList.toggle('static')
}

trackListButton.onclick = function() {
    trackListMenu.classList.toggle('hidden')
}

document.addEventListener('click', function(event) {
    if (!trackListMenu.contains(event.target) && !trackListButton.contains(event.target)) trackListMenu.classList.add('hidden');
  })

mobileMenuHeader.onclick = function() {
    mobileMenu.classList.toggle('active-mobile-menu')
}