import { Color } from "./Color.js";

export class ScreenResponder {
  constructor(screen, simon) {
    screen.subscribe(this);
    this.simon = simon;
    this.series = [];
  }

  notifyThatDoneWasClicked() {
    this.simon.submitSeries(this.series);
  }

  notifyThatYellowWasClicked() {
    this.series.push(Color.yellow);
    this.simon.enterYellow();
  }

  notifyThatRedWasClicked() {
    this.series.push(Color.red);
    this.simon.enterRed();
  }

  notifyThatGreenWasClicked() {
    this.series.push(Color.green);
    this.simon.enterGreen();
  }

  notifyThatBlueWasClicked() {
    this.series.push(Color.blue);
    this.simon.enterBlue();
  }
}
