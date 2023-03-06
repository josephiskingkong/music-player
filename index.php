<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lugolygin Player</title>
    <link rel="stylesheet" href="/music-player/assets/styles/style.css">
</head>
<body>
    

        <section>
            <div class="background">
            </div>
            <div class="main-section">
                <div class="tracklist-menu hidden" id="tracklist">
                    <div class="tracklist-track">
                        <img src="/music-player/assets/images/carti-cover.jpeg" alt="carti-cover" style="width: 50px; height: 50px; border-radius: 10px; margin-right: 10px;">
                         <div class="track-name-author-tracklist">
                            <h1 class="track-name-tracklist">Magnolia</h1>
                            <h2 class="track-author-tracklist">Playboi Carti</h2>
                </div>
                    </div>

                </div>
            <div class="track-info">
                <img src="/music-player/assets/images/carti-cover.jpeg" alt="carti-cover" class="track-cover">
                <div class="track-name-author">
                    <h1 class="track-name">Magnolia</h1>
                    <h2 class="track-author">Playboi Carti</h2>
                </div>
            </div>
            <div class="track-menu">
                <div class="track-list">
                    <button class="tracklist-button" onclick="openTrackList()" id="track-list-button">
                        <img src="/music-player/assets/images/tracklist-icon.png" style="width: 60px; height: 60px;" alt="volume-button">
                    </button>
                </div>
                <div class="buttons">
                    <button id="shuffle-button" class="">
                        <img src="/music-player/assets/images/shuffle-icon.png" style="width: 30px; height: 30px;" alt="shuffle-button">
                    </button>
                    <button id="play-prev-button">
                        <img src="/music-player/assets/images/play-prev-icon.png" style="width: 30px; height: 30px;" alt="play-prev-button">
                    </button>
                    <button id="play-button" class="">
                        <img src="/music-player/assets/images/play-icon.png" alt="play-button">
                    </button>
                    <button id="pause-button" class="hidden">
                        <img src="/music-player/assets/images/pause-icon.png" alt="pause-button">
                    </button>
                    <button id="play-next-button">
                        <img src="/music-player/assets/images/play-next-icon.png" style="width: 30px; height: 30px;" alt="play-next-button">
                    </button>
                    <button id="replay-button" class="">
                        <img src="/music-player/assets/images/replay-icon.png" style="width: 30px; height: 30px;" alt="replay-button">
                    </button>
                </div>
                <div class="volume">
                    <input type="range" name="volume-bar" id="volume-bar" value="70" min="0" max="100" step="1">
                    <button class="volume-button" onclick="activeVolumeBar()">
                        <img src="/music-player/assets/images/volume-icon.png" style="width: 30px; height: 30px;" alt="volume-button">
                    </button>
                </div>
            </div>
            <div class="track-bar">
                <div class="track-time">
                    <div class="current-time"></div>
                    <div class="track-duration"></div>
                </div>
                <input type="range" name="track-bar" id="track-bar" value="0" min="0" max="200" step="1">
            </div>
            </div>
    </section>
    <footer></footer>
    <script src="assets/scripts/buttons.js"></script>
    <script src="https://code.jquery.com/jquery-3.1.1.js"></script>
    <script type="text/javascript">
let bg = document.querySelector('.background');
window.addEventListener('mousemove', function(e) {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;  
    bg.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
});
        </script>
</body>
</html>