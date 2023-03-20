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
const currentCover = document.getElementsByClassName('track-cover')
const currentArtist = document.getElementsByClassName('track-author')
const currentSongName = document.getElementsByClassName('track-name')
const currentBackground = document.getElementsByClassName('background')

const songsPool = new ObjectPool(6, createDecoratedSong);
const magnolia = songsPool.getObject('Magnolia', 'Playboi Carti', ".\\assets\\tracks\\Playboi_Carti_Magnolia.mp3")
const oddity = songsPool.getObject('Space Oddity', 'David Bowie', ".\\assets\\tracks\\David_Bowie_Space_Oddity.mp3")
const man = songsPool.getObject('Only Man', 'Audio Bullys', ".\\assets\\tracks\\Audio_Bullys_Only_Man.mp3")
const immigrant = songsPool.getObject('Immigrant Song', 'Led Zeppelin', ".\\assets\\tracks\\Led_Zeppelin_Immigrant_Song.mp3")
const rocket = songsPool.getObject('Silver Rocket', 'Sonic Youth', ".\\assets\\tracks\\Sonic_Youth_Silver_Rocket.mp3")
const alarm = songsPool.getObject('False Alarm', 'The Weeknd', ".\\assets\\tracks\\The_Weeknd_False_Alarm.mp3")
    
const playlist = {
    0: magnolia, 
    1: oddity, 
    2: man, 
    3: immigrant, 
    4: rocket, 
    5: alarm,

    next() {
        if (!playlist[currentSongIndex].isPlaying) {
            paused = true
        } else {
            paused = false
        }
        playlist[currentSongIndex].pause()
        playlist[currentSongIndex].audio.currentTime = 0
        if (currentSongIndex === playlist.length - 1) {
            currentSongIndex = 0
        } else {
            ++currentSongIndex
        }
        metaConfigure(currentSongIndex)
        if (!paused) {
            playlist[currentSongIndex].play()
            changeButtons()
        } 
    },

    previous() {
        if (!playlist[currentSongIndex].isPlaying) {
            paused = true
        }
        playlist[currentSongIndex].pause()
        playlist[currentSongIndex].audio.currentTime = 0
        if (currentSongIndex === 0) {
            currentSongIndex = playlist.length - 1
        } else {
            --currentSongIndex
        }
        metaConfigure(currentSongIndex)
        if (!paused) {
            playlist[currentSongIndex].play()
            changeButtons()
        }
    }
}

var currentSongIndex = 0;

function metaConfigure(index) {
    if (playlist[currentSongIndex].audio.loop = true) {
        playlist[index].loop = true
    }
    currentSongIndex = index
    currentCover[0].src = trackListCovers[index].src
    currentArtist[0].textContent = trackListArtists[index].textContent
    currentSongName[0].textContent = trackListSongNames[index].textContent
    currentBackground[0].style.backgroundImage = 'url(' + trackListCovers[index].src + ')'
    if (playButton.classList.contains('hidden') && !playlist[currentSongIndex].paused) {
        changeButtons()   
    }
}

var paused

// function playlist.playlist.playlist.next() {
//     if (!playlist[currentSongIndex].isPlaying) {
//         paused = true
//     } else {
//         paused = false
//     }
//     playlist[currentSongIndex].pause()
//     playlist[currentSongIndex].audio.currentTime = 0
//     if (currentSongIndex === playlist.length - 1) {
//         currentSongIndex = 0
//     } else {
//         ++currentSongIndex
//     }
//     metaConfigure(currentSongIndex)
//     if (!paused) {
//         playlist[currentSongIndex].play()
//         changeButtons()
//     } 
// }

// function previous() {
//     if (!playlist[currentSongIndex].isPlaying) {
//         paused = true
//     }
//     playlist[currentSongIndex].pause()
//     playlist[currentSongIndex].audio.currentTime = 0
//     if (currentSongIndex === 0) {
//         currentSongIndex = playlist.length - 1
//     } else {
//         --currentSongIndex
//     }
//     metaConfigure(currentSongIndex)
//     if (!paused) {
//         playlist[currentSongIndex].play()
//         changeButtons()
//     }
// }

playlist.forEach(element => {
    element.audio.addEventListener("ended", (event) => {
        playlist.next()
        playlist[currentSongIndex].play()
    }) 
});

forwardButton.addEventListener('click', function() {
    playlist.next()
})

backButton.addEventListener('click', function() {
    playlist.previous()
})

shuffleButton.addEventListener('click', function() {
    playlist[currentSongIndex].pause()
    playlist[currentSongIndex].audio.currentTime = 0
    let destination = currentSongIndex
    while (destination == currentSongIndex) {
        destination = Math.floor(Math.random() * playlist.length)
    }
    metaConfigure(destination)
    playlist[currentSongIndex].play()
    changeButtons()
})

function changeButtons() {
    playButton.classList.toggle('hidden')
    pauseButton.classList.toggle('hidden')
}

function toStatic() {
    playButton.classList.toggle('static')
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
        previous()
    } else if (event.key === 'l') {
        playlist.next()
    } else if (event.key === 'j') {
        playlist[currentSongIndex].pause()
        playlist[currentSongIndex].audio.currentTime = 0
        let destination = currentSongIndex
        while (destination == currentSongIndex) {
            destination = Math.floor(Math.random() * playlist.length)
        }
        metaConfigure(destination)
        playlist[currentSongIndex].play()
        changeButtons()
    } else if (event.key === ';') {
        replayButton.classList.toggle('static-replay')
        playlist[currentSongIndex].audio.loop = true
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

playlist.forEach(element => {
    element.audio.addEventListener('timeupdate', () => {
        const currentTime = playlist[currentSongIndex].audio.currentTime
        const duration = playlist[currentSongIndex].audio.duration
        const progress = (currentTime / duration) * 100
        trackBar.value = progress
    })
})

volumeBar.addEventListener('input', () => {
    playlist[currentSongIndex].audio.volume = volumeBar.value
})

playlist.forEach(element => {
    element.audio.addEventListener('volumechange', () => {
        volumeBar.value = playlist[currentSongIndex].audio.volume 
    })
})

mobileVolumeBar.addEventListener('input', () => {
    playlist[currentSongIndex].audio.volume = mobileVolumeBar.value
})

playlist.forEach(element => {
    element.audio.addEventListener('volumechange', () => {
        mobileVolumeBar.value = playlist[currentSongIndex].audio.volume 
    })
})

replayButton.onclick = function () {
    replayButton.classList.toggle('static-replay')
    playlist[currentSongIndex].audio.loop = true
}

trackListButton.onclick = function() {
    trackListMenu.classList.toggle('hidden')
}

for (let elementIndex = 0; elementIndex < trackListElements.length; ++elementIndex) {
    trackListElements[elementIndex].addEventListener('click', () => {
    playlist[currentSongIndex].pause()
    playlist[currentSongIndex].audio.currentTime = 0
    metaConfigure(elementIndex)
    playlist[currentSongIndex].play()
    changeButtons()})
}

document.addEventListener('click', function(event) {
    if (!trackListMenu.contains(event.target) && !trackListButton.contains(event.target)) trackListMenu.classList.add('hidden');
  })

mobileMenuHeader.onclick = function() {
    mobileMenu.classList.toggle('active-mobile-menu')
}