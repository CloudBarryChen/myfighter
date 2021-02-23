var biuUrl = require('../sound/biubiubiu.mp3');

var AUDIOS = {
    plane: {
        blue: {
            shoot: function() {
                var audio = new Audio();

                audio.addEventListener('ended', () => {
                    audio = null;
                }, false)

                audio.addEventListener('canplaythrough', () => {
                    audio.play();
                }, false)

                audio.src = biuUrl;
            }
        }
    }
}