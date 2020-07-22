import { ScreenResponder } from "../lib/ScreenResponder.js";

function clickRed(screen) {
  screen.clickRed();
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

  clickDone() {
    this.listener.notifyThatDoneWasClicked();
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
    this.submitted_ = false;
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

  submitted() {
    return this.submitted_;
  }

  submit() {
    this.submitted_ = true;
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

  it("should submit when user clicks done", function () {
    let screen = new ScreenStub();
    let simon = new SimonStub();
    new ScreenResponder(screen, simon);
    screen.clickDone();
    expectTrue(simon.submitted());
  });
});
