const playButton = document.getElementById('play-button')
const pauseButton = document.getElementById('pause-button')
const shuffleButton = document.getElementById('shuffle-button')
const replayButton = document.getElementById('replay-button')
const trackListMenu = document.getElementById('tracklist')
const trackListButton = document.getElementById('track-list-button')
const mobileMenu = document.getElementById('mobile-menu')
const mobileMenuHeader = document.getElementById('mobile-menu-header')

function changeButtons() {
    playButton.classList.toggle('hidden')
    pauseButton.classList.toggle('hidden')
}

function toStatic() {
    playButton.classList.toggle('static')
}

playButton.onclick = function() {
    changeButtons()
}
pauseButton.onclick = function() {
    changeButtons()
}

replayButton.onclick = function () {
    replayButton.classList.toggle('static-replay')
}
shuffleButton.onclick = function () {
    shuffleButton.classList.toggle('static')
}

function openTrackList() {
    trackListMenu.classList.toggle('hidden')
}

document.addEventListener('click', function(event) {
    if (!trackListMenu.contains(event.target) && !trackListButton.contains(event.target)) trackListMenu.classList.add('hidden');
  });

mobileMenuHeader.onclick = function() {
    mobileMenu.classList.toggle('active-mobile-menu')
}