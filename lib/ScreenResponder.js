import { Color } from './Color.js'

export class ScreenResponder {
    constructor(screen, simon) {
        screen.subscribe(this);
        this.simon = simon;
        this.series = [];
    }

    notifyThatDoneWasClicked() {
        this.simon.submitSeries(this.series);
    }

    notifyThatYellowWasClicked() { this.series.push(Color.yellow); }

    notifyThatRedWasClicked() { this.series.push(Color.red); }

    notifyThatGreenWasClicked() { this.series.push(Color.green); }

    notifyThatBlueWasClicked() { this.series.push(Color.blue); }
}
