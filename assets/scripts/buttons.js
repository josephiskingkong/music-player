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
const tracklist = document.getElementById('tracklist')
const mobileTracklist = document.getElementById('mobile-tracklist')
const videoElement = document.getElementById("video");


const songsPool = new ObjectPool(6, createDecoratedSong);

let currentSongIndex = 0
let songsAmount = 10
let paused = false
let newSongIndex = Number
var songsArray = []
var dataArray = []

try {
    const response = await fetch('.\\assets\\songs.json');
    const data = await response.json();
    dataArray = data;
}
catch (error) {
    console.error(error);
}

for (let songIndex = 0; songIndex < Object.keys(dataArray.songs).length; ++songIndex) {
    const {title, artist, url, meta} = dataArray.songs[songIndex]
    let songObject
    if (meta !== undefined) {
        songObject = songsPool.getObject(title, artist, url, meta)
    } else {
        songObject = songsPool.getObject(title, artist, url)
    }
    songsArray.push(songObject)
}

const playlist = {
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

        playlist[currentSongIndex].pause();
        playlist[currentSongIndex].audio.currentTime = 0;

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
        playlist[currentSongIndex].pause();
        playlist[currentSongIndex].audio.currentTime = 0;

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

for (let songIndex = 0; songIndex < songsArray.length; ++songIndex) {
    playlist[songIndex] = songsArray[songIndex]
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

let tracklistSongs = ''

for (let songIndex = 0; songIndex < Object.keys(dataArray.songs).length; ++songIndex) {
    tracklistSongs += `<div class="tracklist-track">
    <img src="${playlist[songIndex]['cover']}" alt="${playlist[songIndex]['title']} cover"
        style="width: 50px; height: 50px; border-radius: 10px; margin-right: 10px;"
        class=tracklist-cover>
    <div class="track-name-author-tracklist">
        <h1 class="track-name-tracklist">${playlist[songIndex].title}</h1>
        <h2 class="track-author-tracklist">${playlist[songIndex].artist}</h2>
    </div>
</div>`
}

tracklist.innerHTML = tracklistSongs
mobileTracklist.innerHTML = tracklistSongs

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
    if (playlist[currentSongIndex].video == undefined) {
        currentBackground[0].style.backgroundImage = 'url(' + trackListCovers[newIndex].src + ')'
        videoElement.classList.add('hidden');
    } else {
        videoElement.classList.remove('hidden');
        if (playlist[currentSongIndex].video == undefined) {
            const coverImageUrl = trackListCovers[newIndex].src
            resizeImage(coverImageUrl, 1000, 1000, function (resizedImageUrl) {
            currentCover[0].src = resizedImageUrl;
            currentBackground[0].style.backgroundImage = 'url(' + resizedImageUrl + ')';
            });

        } else {
            videoElement.src = playlist[currentSongIndex].video;
            videoElement.pause();
        }
    }
    updateMediaSessionMetadata();

    playlist[currentSongIndex].audio.volume = volumeBar.value

    if (playlist[currentSongIndex].text !== undefined) {
        trackText.innerHTML =  getTextFromFile(playlist[currentSongIndex].text)
    } else {
        trackText.innerHTML = playlist[currentSongIndex].title + "<br>" + playlist[currentSongIndex].artist
    }

    if (playButton.classList.contains('hidden') && !playlist[newIndex].paused) {
        changeButtons()   
        if (playlist[currentSongIndex].video != undefined) {
            videoElement.play()
        }
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
    if (playlist[currentSongIndex].video != undefined) {
        videoElement.play()
    }
    changeButtons()
}

pauseButton.onclick = function() {
    playlist[currentSongIndex].pause()
    if (playlist[currentSongIndex].video != undefined) {
        videoElement.pause()
    }
    changeButtons()
}

window.addEventListener('keypress', function (event) {
    if (event.key === ' ') {
        if (!playlist[currentSongIndex].isPlaying) {
            playlist[currentSongIndex].play()
            if (playlist[currentSongIndex].video != undefined) {
                videoElement.play()
            }
        } else {
            playlist[currentSongIndex].pause()
            if (playlist[currentSongIndex].video != undefined) {
                videoElement.pause()
            }
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
        metaConfigure(currentSongIndex, elementIndex % (Object.keys(playlist).length - 2))
        playlist[currentSongIndex].play()
        if (playlist[currentSongIndex].video != undefined) {
            videoElement.play()
        }
        changeButtons()
    })
}

document.addEventListener('click', function(event) {
    if (!trackListMenu.contains(event.target) && !trackListButton.contains(event.target)) trackListMenu.classList.add('hidden');
  })

mobileMenuHeader.onclick = function() {
    mobileMenu.classList.toggle('active-mobile-menu')
}

if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', () => {
      playlist[currentSongIndex].play();
      if (playlist[currentSongIndex].video !== undefined) {
        videoElement.play();
      }
      changeButtons();
    });
  
    navigator.mediaSession.setActionHandler('pause', () => {
      playlist[currentSongIndex].pause();
      if (playlist[currentSongIndex].video !== undefined) {
        videoElement.pause();
      }
      changeButtons();
    });
  
    navigator.mediaSession.setActionHandler('previoustrack', () => {
      playlist.previous();
    });
  
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      playlist.next();
    });
  }
  
  function updateMediaSessionMetadata() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: playlist[currentSongIndex].title,
        artist: playlist[currentSongIndex].artist,
        album: '',
        artwork: [
          { src: playlist[currentSongIndex].cover, sizes: '96x96', type: 'image/png' },
          { src: playlist[currentSongIndex].cover, sizes: '128x128', type: 'image/png' },
          { src: playlist[currentSongIndex].cover, sizes: '192x192', type: 'image/png' },
          { src: playlist[currentSongIndex].cover, sizes: '256x256', type: 'image/png' },
          { src: playlist[currentSongIndex].cover, sizes: '384x384', type: 'image/png' },
          { src: playlist[currentSongIndex].cover, sizes: '512x512', type: 'image/png' },
        ]
      });
    }
  }

  function handleVisibilityChange() {
    var videoElement = document.getElementById("video");
    if (document.hidden) {
        videoElement.pause();
    } else if (playlist[currentSong].paused != true) {
        videoElement.play();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("visibilitychange", handleVisibilityChange);
});
  