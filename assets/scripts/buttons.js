import { ObjectPool } from './object pool.js';
import { Song, createSong, createDecoratedSong } from './song class.js';

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
const forwardButton = document.getElementById('play-next-button')
const backButton = document.getElementById('play-prev-button')
const trackListElements = document.getElementsByClassName('tracklist-track')
const trackListCovers = document.getElementsByClassName('tracklist-cover')
const trackListArtists = document.getElementsByClassName('track-author-tracklist')
const trackListSongNames = document.getElementsByClassName('track-name-tracklist')
const trackText = document.getElementById('lyrics-header')
const currentCover = document.getElementsByClassName('track-cover')
const currentArtist = document.getElementsByClassName('track-author')
const currentSongName = document.getElementsByClassName('track-name')
const currentBackground = document.getElementsByClassName('background')

const songsPool = new ObjectPool(6, createDecoratedSong);
const magnolia = songsPool.getObject('Magnolia', 'Playboi Carti', ".\\assets\\tracks\\Playboi_Carti_Magnolia.mp3", {text: ".\\assets\\texts\\Magnolia.txt"})
const oddity = songsPool.getObject('Space Oddity', 'David Bowie', ".\\assets\\tracks\\David_Bowie_Space_Oddity.mp3", {text: ".\\assets\\texts\\Space Oddity.txt"})
const man = songsPool.getObject('Only Man', 'Audio Bullys', ".\\assets\\tracks\\Audio_Bullys_Only_Man.mp3")
const immigrant = songsPool.getObject('Immigrant Song', 'Led Zeppelin', ".\\assets\\tracks\\Led_Zeppelin_Immigrant_Song.mp3")
const rocket = songsPool.getObject('Silver Rocket', 'Sonic Youth', ".\\assets\\tracks\\Sonic_Youth_Silver_Rocket.mp3")
const alarm = songsPool.getObject('False Alarm', 'The Weeknd', ".\\assets\\tracks\\The_Weeknd_False_Alarm.mp3", {text: ".\\assets\\texts\\False Alarm.txt"})
const nostylist = songsPool.getObject('NO STYLIST', 'Destroy Lonely', ".\\assets\\tracks\\Destroy Lonely - NOSTYLIST (Official Audio).mp3", {text: ".\\assets\\texts\\NO STYLIST.txt"})
const wannarock = songsPool.getObject('I Just Wanna Rock', 'Lil Uzi Vert', ".\\assets\\tracks\\Lil Uzi Vert - Just Wanna Rock [Official Visualizer].mp3")
const grid = songsPool.getObject('Off The Grid (Remix)', 'Playboi Carti', ".\\assets\\tracks\\Playboi Carti - Off the Grid (Remix) (Tiktok Viral Song).mp3")
const cooler = songsPool.getObject('Cooler Than Me', 'Lancey Foux', ".\\assets\\tracks\\Lancey Foux - Cooler Than Me (Visualiser).mp3")

let currentSongIndex = 0
let songsAmount = 10
let paused = false
let newSongIndex = Number

const playlist = {
    0: magnolia, 
    1: oddity, 
    2: man, 
    3: immigrant, 
    4: rocket, 
    5: alarm,
    6: nostylist,
    7: wannarock,
    8: grid,
    9: cooler,

    
    [Symbol.iterator]() {
        return this
    },

    next() {
        let done = false
        if (currentSongIndex === songsAmount - 1) {
            done = true
        }

        if (!playlist[currentSongIndex].isPlaying) {
            paused = true
        } else {
            paused = false
        }

        if (shuffleButton.classList.contains('static')) {
            newSongIndex = -1
            while (newSongIndex === currentSongIndex || newSongIndex === -1) {
                newSongIndex = Math.floor(Math.random() * (songsAmount))
            }
            metaConfigure(currentSongIndex, newSongIndex)
            if (!paused) {
                playlist[currentSongIndex].play()
                changeButtons()
            }
            return { done, value: playlist[currentSongIndex] }
        } else if (done) {
            newSongIndex = 0
            metaConfigure(currentSongIndex, newSongIndex)
            if (!paused) {
                playlist[currentSongIndex].play()
                changeButtons()
            } 
            return { done: true }
        } else {
            newSongIndex = currentSongIndex + 1
            metaConfigure(currentSongIndex, newSongIndex)
            if (!paused) {
                playlist[currentSongIndex].play()
                changeButtons()
            }
            return { done, value: playlist[currentSongIndex] } 
        }
    },

    previous() {
        if (!playlist[currentSongIndex].isPlaying) {
            paused = true
        } else {
            paused = false
        }

        if (shuffleButton.classList.contains('static')) {
            newSongIndex = -1
            while (newSongIndex === currentSongIndex || newSongIndex === -1) {
                newSongIndex = Math.floor(Math.random() * (songsAmount))
            }
        } else if (currentSongIndex === 0) {
            newSongIndex = songsAmount- 1
        } else {
            newSongIndex = currentSongIndex - 1 
        }
        metaConfigure(currentSongIndex, newSongIndex)
        if (!paused) {
            playlist[currentSongIndex].play()
            changeButtons()
        }
    }
}

function getTextFromFile(filepath) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filepath, false);
    xhr.send();
  
    if (xhr.status === 200) {
      return xhr.responseText;
    } else {
      throw new Error('Error loading file');
    }
}

function metaConfigure(oldIndex, newIndex) {
    playlist[currentSongIndex].pause()
    playlist[currentSongIndex].audio.currentTime = 0

    if (replayButton.classList.contains('static-replay')) {
        playlist[oldIndex].audio.loop = false
        playlist[newIndex].audio.loop = true
    }
    currentSongIndex = newIndex
    currentCover[0].src = trackListCovers[newIndex].src
    currentArtist[0].textContent = trackListArtists[newIndex].textContent
    currentSongName[0].textContent = trackListSongNames[newIndex].textContent
    currentBackground[0].style.backgroundImage = 'url(' + trackListCovers[newIndex].src + ')'
    playlist[currentSongIndex].audio.volume = volumeBar.value

    if (playlist[currentSongIndex].text !== undefined) {
        trackText.innerHTML =  getTextFromFile(playlist[currentSongIndex].text)
    } else {
        trackText.innerHTML = playlist[currentSongIndex].title + "<br>" + playlist[currentSongIndex].artist
    }

    if (playlist[currentSongIndex].text !== undefined) {
        trackText.innerHTML =  getTextFromFile(playlist[currentSongIndex].text)
    } else {
        trackText.innerHTML = playlist[currentSongIndex].title + "<br>" + playlist[currentSongIndex].artist
    }

    if (playButton.classList.contains('hidden') && !playlist[newIndex].paused) {
        changeButtons()   
    }
}


playlist[0].audio.addEventListener('timeupdate', () => {
    const currentTime = playlist[currentSongIndex].audio.currentTime
    const duration = playlist[currentSongIndex].audio.duration
    const progress = (currentTime / duration) * 100
    trackBar.value = progress
})
playlist[0].audio.addEventListener("ended", () => {
    if (!replayButton.classList.contains('static-replay')) {
        playlist.next()
    }
    playlist[currentSongIndex].play()
})
for (let element of playlist) {
    element.audio.addEventListener('timeupdate', () => {
        const currentTime = playlist[currentSongIndex].audio.currentTime
        const duration = playlist[currentSongIndex].audio.duration
        const progress = (currentTime / duration) * 100
        trackBar.value = progress
    })
    element.audio.addEventListener('volumechange', () => {
        volumeBar.value = playlist[currentSongIndex].audio.volume 
    })
    element.audio.addEventListener('volumechange', () => {
        mobileVolumeBar.value = playlist[currentSongIndex].audio.volume 
    })
    element.audio.addEventListener("ended", () => {
        if (!replayButton.classList.contains('static-replay')) {
            playlist.next()
        }
        playlist[currentSongIndex].play()
    })
}

forwardButton.addEventListener('click', function() {
    playlist.next()
})

backButton.addEventListener('click', function() {
    playlist.previous()
})

shuffleButton.addEventListener('click', function() {
    shuffleButton.classList.toggle('static')
})

function changeButtons() {
    playButton.classList.toggle('hidden')
    pauseButton.classList.toggle('hidden')
}

playButton.onclick = function() {
    playlist[currentSongIndex].play()
    changeButtons()
}

pauseButton.onclick = function() {
    playlist[currentSongIndex].pause()
    changeButtons()
}

window.addEventListener('keypress', function (event) {
    if (event.key === ' ') {
        if (!playlist[currentSongIndex].isPlaying) {
            playlist[currentSongIndex].play()
        } else {
            playlist[currentSongIndex].pause()
        }
        changeButtons()
    } else if (event.key === 'k') {
        playlist.previous()
    } else if (event.key === 'l') {
        playlist.next()
    } else if (event.key === 'j') {
        shuffleButton.classList.toggle('static')
    } else if (event.key === ';') {
        replayButton.classList.toggle('static-replay')
        if (playlist[currentSongIndex].audio.loop) {
            playlist[currentSongIndex].audio.loop = false
        } else {
            playlist[currentSongIndex].audio.loop = true
        }
    }
})

document.querySelectorAll("button").forEach( function(item) {
    item.addEventListener('focus', function() {
        this.blur();
    })
})

trackBar.addEventListener('input', () => {
    const seekTime = playlist[currentSongIndex].audio.duration * (trackBar.value / 100)
    playlist[currentSongIndex].audio.currentTime = seekTime
})

volumeBar.addEventListener('input', () => {
    playlist[currentSongIndex].audio.volume = volumeBar.value
    mobileVolumeBar.value = volumeBar.value
})

mobileVolumeBar.addEventListener('input', () => {
    playlist[currentSongIndex].audio.volume = mobileVolumeBar.value
    volumeBar.value = mobileVolumeBar.value
})

replayButton.onclick = function () {
    if (replayButton.classList.contains('static-replay')) {
        playlist[currentSongIndex].audio.loop = false
        
    } else {
        playlist[currentSongIndex].audio.loop = true
    }
    replayButton.classList.toggle('static-replay')
}

trackListButton.onclick = function() {
    trackListMenu.classList.toggle('hidden')
}

for (let elementIndex = 0; elementIndex < trackListElements.length; ++elementIndex) {
    trackListElements[elementIndex].addEventListener('click', () => {
    playlist[currentSongIndex].pause()
    playlist[currentSongIndex].audio.currentTime = 0
    metaConfigure(currentSongIndex, elementIndex)
    playlist[currentSongIndex].play()
    changeButtons()})
}

document.addEventListener('click', function(event) {
    if (!trackListMenu.contains(event.target) && !trackListButton.contains(event.target)) trackListMenu.classList.add('hidden');
  })

mobileMenuHeader.onclick = function() {
    mobileMenu.classList.toggle('active-mobile-menu')
}