import { ScreenResponder } from "../lib/ScreenResponder.js";
import { Color } from "../lib/Color.js";

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
  clickDone() {
    this.listener.notifyThatDoneWasClicked();
  }

  clickYellow() {
    this.listener.notifyThatYellowWasClicked();
  }

  clickRed() {
    this.listener.notifyThatRedWasClicked();
  }

  clickGreen() {
    this.listener.notifyThatGreenWasClicked();
  }

  clickBlue() {
    this.listener.notifyThatBlueWasClicked();
  }

  subscribe(e) {
    this.listener = e;
  }
}

class SimonStub {
  constructor() {
    this.redEntered_ = false;
    this.yellowEntered_ = false;
    this.greenEntered_ = false;
    this.blueEntered_ = false;
  }

  submitSeries(s) {
    this.submittedSeries_ = s;
  }

  submittedSeries() {
    return this.submittedSeries_;
  }

  redEntered() {
    return this.redEntered_;
  }

  enterRed() {
    this.redEntered_ = true;
  }

  enterGreen() {
    this.greenEntered_ = true;
  }

  enterBlue() {
    this.blueEntered_ = true;
  }

  enterYellow() {
    this.yellowEntered_ = true;
  }
}

function expectTrue(b) {
  expect(b).toBeTrue();
}

function redEntered(simon) {
  return simon.redEntered();
}

describe("ScreenResponder", function () {
  it("should enter red when user clicks red", function () {
    let screen = new ScreenStub();
    let simon = new SimonStub();
    new ScreenResponder(screen, simon);
    clickRed(screen);
    expectTrue(redEntered(simon));
  });
});
