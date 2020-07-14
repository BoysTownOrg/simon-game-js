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

function scheduleNotificationAfterMilliseconds(timer, x) {
    timer.scheduleNotificationAfterMilliseconds(x);
}

export class Simon {
    constructor(presenter, audioPlayer, timer) {
        this.presenter = presenter;
        this.audioPlayer = audioPlayer;
        this.timer = timer;
        this.timer.subscribe(this);
    }

    notify() {
        lightUpAndPlayShiftedColor(this.presenter, this.audioPlayer, this.colors);
        if (this.colors.length > 0)
            scheduleNotificationAfterMilliseconds(this.timer, this.scheduledNotificationTimeMilliseconds_);
    }

    say(colors) {
        this.colors = colors;
        lightUpAndPlayShiftedColor(this.presenter, this.audioPlayer, this.colors);
        if (this.colors.length > 0)
            scheduleNotificationAfterMilliseconds(this.timer, this.scheduledNotificationTimeMilliseconds_);
    }

    setScheduleNotifactionTimeMilliseconds(x) { this.scheduledNotificationTimeMilliseconds_ = x; }
}