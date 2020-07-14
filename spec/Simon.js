import { Simon } from '../lib/Simon.js'
import { Color } from '../lib/Color.js'

class PresenterStub {
    redLitUp() { return this.redLitUp_; }

    greenLitUp() { return this.greenLitUp_; }

    yellowLitUp() { return this.yellowLitUp_; }

    blueLitUp() { return this.blueLitUp_; }

    lightUpRed() { this.redLitUp_ = true; }

    lightUpGreen() { this.greenLitUp_ = true; }

    lightUpYellow() { this.yellowLitUp_ = true; }

    lightUpBlue() { this.blueLitUp_ = true; }
}

class AudioPlayerStub {
    redPlayed() { return this.redPlayed_; }

    greenPlayed() { return this.greenPlayed_; }

    yellowPlayed() { return this.yellowPlayed_; }

    bluePlayed() { return this.bluePlayed_; }

    playRed() { this.redPlayed_ = true; }

    playGreen() { this.greenPlayed_ = true; }

    playYellow() { this.yellowPlayed_ = true; }

    playBlue() { this.bluePlayed_ = true; }
}

class TimerStub {
    callback() {
        this.listener.notify();
    }

    subscribe(e) { this.listener = e; }

    scheduledNotificationTimeMilliseconds() { return this.scheduledNotificationTimeMilliseconds_; }

    scheduleNotificationAfterMilliseconds(x) { this.scheduledNotificationTimeMilliseconds_ = x; }
}

function say(simon, colors) {
    simon.say(colors);
}

function callback(timer) {
    timer.callback();
}

function redLitUp(presenter) {
    return presenter.redLitUp();
}

function greenLitUp(presenter) {
    return presenter.greenLitUp();
}

function blueLitUp(presenter) {
    return presenter.blueLitUp();
}

function yellowLitUp(presenter) {
    return presenter.yellowLitUp();
}

function redPlayed(audioPlayer) {
    return audioPlayer.redPlayed();
}

function greenPlayed(audioPlayer) {
    return audioPlayer.greenPlayed();
}

function bluePlayed(audioPlayer) {
    return audioPlayer.bluePlayed();
}

function yellowPlayed(audioPlayer) {
    return audioPlayer.yellowPlayed();
}

function expectTrue(b) {
    expect(b).toBeTrue();
}

function scheduledNotificationTimeMilliseconds(timer) {
    return timer.scheduledNotificationTimeMilliseconds();
}

describe("Simon", function () {
    it("should light each color while playing corresponding tone", function () {
        let presenter = new PresenterStub();
        let audioPlayer = new AudioPlayerStub();
        let timer = new TimerStub();
        let simon = new Simon(presenter, audioPlayer, timer);
        say(simon, [Color.red, Color.green, Color.blue, Color.yellow]);
        expectTrue(redLitUp(presenter));
        expectTrue(redPlayed(audioPlayer));
        callback(timer);
        expectTrue(greenLitUp(presenter));
        expectTrue(greenPlayed(audioPlayer));
        callback(timer);
        expectTrue(blueLitUp(presenter));
        expectTrue(bluePlayed(audioPlayer));
        callback(timer);
        expectTrue(yellowLitUp(presenter));
        expectTrue(yellowPlayed(audioPlayer));
    });

    it("should schedule timed notification on say", function () {
        let presenter = new PresenterStub();
        let audioPlayer = new AudioPlayerStub();
        let timer = new TimerStub();
        let simon = new Simon(presenter, audioPlayer, timer);
        simon.setScheduleNotifactionTimeMilliseconds(1);
        say(simon, [Color.red, Color.green, Color.blue, Color.yellow]);
        expect(scheduledNotificationTimeMilliseconds(timer)).toEqual(1);
    });
});
