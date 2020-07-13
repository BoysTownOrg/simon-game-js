import { ScreenResponder, Color } from "../lib/ScreenResponder.js"

function clickRed(screen) {
  screen.clickRed();
}

function clickGreen(screen) {
  screen.clickGreen();
}

function clickBlue(screen) {
  screen.clickBlue();
}

function clickYellow(screen) {
  screen.clickYellow();
}

function clickDone(screen) {
  screen.clickDone();
}

function submittedSeries(simon) {
  return simon.submittedSeries();
}

class ScreenStub {
  clickDone() { this.listener.notifyThatDoneWasClicked() }

  clickYellow() { this.listener.notifyThatYellowWasClicked() }

  clickRed() { this.listener.notifyThatRedWasClicked() }

  clickGreen() { this.listener.notifyThatGreenWasClicked() }

  clickBlue() { this.listener.notifyThatBlueWasClicked(); }

  subscribe(e) { this.listener = e; }
}

class SimonStub {
  submitSeries(s) {
    this.submittedSeries_ = s;
  }

  submittedSeries() {
    return this.submittedSeries_;
  }
}

describe("ScreenResponder", function () {
  it("should submit series when user clicks done", function () {
    let screen = new ScreenStub();
    let simon = new SimonStub();
    let responder = new ScreenResponder(screen, simon);
    clickRed(screen);
    clickGreen(screen);
    clickBlue(screen);
    clickYellow(screen);
    clickDone(screen);
    expect(submittedSeries(simon)).toEqual([Color.red, Color.green, Color.blue, Color.yellow]);
  });
});
