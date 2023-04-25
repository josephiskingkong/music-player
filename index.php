<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lugolygin Player</title>
    <link rel="stylesheet" href="/music-player/assets/styles/style.css">
    <script src="https://code.jquery.com/jquery-3.1.1.js"></script>
    <script type="module" src="assets/scripts/buttons.js"></script>
</head>

<body>
    <section>
        <div class="loader-container" id="preloader">
            <div id="loader">
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
                <div class="ring"></div>
            </div>
        </div>
        <div class="background">
        </div>
        <video id="video" autoplay muted loop playsinline disablePictureInPicture></video>
        <nav>
            <div class="logo">
                <img src="./assets/images/logo.png" alt="">
            </div>
        </nav>
        <div class="main-section">
            <div class="tracklist-menu hidden" id="tracklist">

            </div>

            <div class="track-info">
                <div class="track-cover-block">
                    <div class="track-front">
                        <img src="" alt="track-cover" class="track-cover">
                    </div>
                    <div class="track-back">
                        <div class="lyrics">
                            <h1 id="lyrics-header">
                            </h1>
                        </div>
                    </div>
                </div>
                <div class="track-name-author">
                    <h1 class="track-name"></h1>
                    <h2 class="track-author"></h2>
                </div>
            </div>

            <div class="track-menu">
                <div class="track-list">
                    <button class="tracklist-button" id="track-list-button">
                        <img src="/music-player/assets/images/tracklist-icon.png" style="width: 60px; height: 60px;"
                            alt="volume-button">
                    </button>
                </div>
                <div class="buttons">
                    <button id="shuffle-button" class="">
                        <img src="/music-player/assets/images/shuffle-icon.png" style="width: 30px; height: 30px;"
                            alt="shuffle-button">
                    </button>
                    <button id="play-prev-button">
                        <img src="/music-player/assets/images/play-prev-icon.png" style="width: 30px; height: 30px;"
                            alt="play-prev-button">
                    </button>
                    <button id="play-button" class="">
                        <img src="/music-player/assets/images/play-icon.png" alt="play-button">
                    </button>
                    <button id="pause-button" class="hidden">
                        <img src="/music-player/assets/images/pause-icon.png" alt="pause-button">
                    </button>
                    <button id="play-next-button">
                        <img src="/music-player/assets/images/play-next-icon.png" style="width: 30px; height: 30px;"
                            alt="play-next-button">
                    </button>
                    <button id="replay-button" class="">
                        <img src="/music-player/assets/images/replay-icon.png" style="width: 30px; height: 30px;"
                            alt="replay-button">
                    </button>
                </div>
                <div class="volume">
                    <input type="range" name="volume-bar" id="volume-bar" value="1" min="0" max="1" step="0.01">
                    <button class="volume-button">
                        <img src="/music-player/assets/images/volume-icon.png" style="width: 30px; height: 30px;"
                            alt="volume-button">
                    </button>
                </div>
            </div>
            <div class="track-bar">
                <div class="track-time">
                    <div class="current-time"></div>
                    <div class="track-duration"></div>
                </div>
                <input type="range" name="track-bar" id="track-bar" value="1" min="0" max="100" step="1">
            </div>

            <div class="mobile-menu" id="mobile-menu">
                <div class="mobile-menu-header" id="mobile-menu-header">
                    <button class="open-mobile-menu">

                    </button>
                </div>
                <div class="mobile-settings">
                    <h1 style="font-size: 36px; color: black; margin-bottom: 10px;">Settings</h1>
                    <div class="volume-setting">
                        <h2 style="font-size: 24px; color: black; font-weight: 500; margin-right: 10px;">Volume</h2>
                        <input type="range" name="mobile-volume-bar" id="mobile-volume-bar" value="1" min="0" max="1"
                            step="0.01">
                    </div>
                </div>
                <h1 style="font-size: 36px; color: black; padding-bottom: 20px; padding-left: 20px;">Tracklist</h1>
                <div class="mobile-tracklist" id="mobile-tracklist">

                </div>
            </div>
    </section>
    <footer></footer>

    <script type="text/javascript">
        let bg = document.querySelector('.background');
        window.addEventListener('mousemove', function (e) {
            let x = e.clientX / window.innerWidth;
            let y = e.clientY / window.innerHeight;
            bg.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
        });
    </script>
    <script>
        const pauseButton = document.getElementById('pause-button')
        function handleVisibilityChange() {
            var videoElement = document.getElementById("video");
            if (document.hidden) {
                videoElement.pause();
            } else if (!pauseButton.classList.contains('hidden')) {
                videoElement.play();
            }
        }

        document.addEventListener("DOMContentLoaded", function () {
            document.addEventListener("visibilitychange", handleVisibilityChange);
        });
    </script>
    <script>
        const preloader = document.getElementById('preloader');
        const loader = document.getElementById('loader')
        window.addEventListener("load", function () {
            
            let opacity = 1;
            let initSize = 150;
            let intervalId = setInterval(function () {
                opacity -= 0.01;
                initSize += 5;
                preloader.style.opacity = opacity;
                loader.style.width = initSize;
                loader.style.height = initSize;

                if (opacity <= 0) {
                    clearInterval(intervalId);
                    preloader.style.display = "none";
                }
            }, 10);
        });
    </script>
</body>

</html>