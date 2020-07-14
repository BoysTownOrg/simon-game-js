import { Color } from "./Color.js";

function lightUpAndPlay(presenter, audioPlayer, color) {
    switch (color) {
        case Color.red:
            presenter.lightUpRed();
            audioPlayer.playRed();
            break;
        case Color.green:
            presenter.lightUpGreen();
            audioPlayer.playGreen();
            break;
        case Color.yellow:
            presenter.lightUpYellow();
            audioPlayer.playYellow();
            break;
        default:
            presenter.lightUpBlue();
            audioPlayer.playBlue();
    }
}

function lightUpAndPlayShiftedColor(presenter, audioPlayer, colors) {
    lightUpAndPlay(presenter, audioPlayer, colors.shift());
}

export class Simon {
    constructor(presenter, audioPlayer, timer) {
        this.presenter = presenter;
        this.audioPlayer = audioPlayer;
        timer.subscribe(this);
    }

    notify() { lightUpAndPlayShiftedColor(this.presenter, this.audioPlayer, this.colors); }

    say(colors) {
        this.colors = colors;
        lightUpAndPlayShiftedColor(this.presenter, this.audioPlayer, this.colors);
    }
}